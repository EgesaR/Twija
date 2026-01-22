from fastapi import APIRouter, Depends, HTTPException, Response
from supabase import Client
from typing import cast, Any, Dict

from app.config.dependencies import get_supabase_client, get_admin_client
from app.config.dependencies import get_current_user, verify_admin
from app.models.models import PromotionRequest, AdminSignupRequest, ProfileUpdate

router = APIRouter()

# --- 1. PUBLIC: Request Admin Access ---


@router.post("/request-admin")
def request_admin_access(payload: AdminSignupRequest, db: Client = Depends(get_supabase_client)):
    try:
        db.table("admin_requests").insert({
            "email": payload.email,
            "full_name": payload.full_name
        }).execute()
        return {"status": "success", "message": "Request submitted"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# --- 2. PRIVATE: Super Admin Approves & Invites ---


@router.post("/approve-admin/{request_id}")
def approve_admin_request(request_id: str, admin_db: Client = Depends(get_admin_client)):
    try:
        # Fetch the request
        res = admin_db.table("admin_requests").select(
            "*").eq("id", request_id).single().execute()

        # FIX 1: Explicitly cast res.data to a Dictionary to help Pylance
        data = cast(Dict[str, Any], res.data)
        if not data:
            raise HTTPException(
                status_code=404, detail="Admin request not found")

        # FIX 2: Force email and full_name to strings
        email = str(data.get("email", ""))
        full_name = str(data.get("full_name", ""))

        # FIX 3: Cast the options dictionary to Any to bypass the 'InviteUserByEmailOptions' check
        invite_options: Any = {
            "data": {"full_name": full_name},
            "redirectTo": "http://localhost:3000/admin/finish-setup"
        }

        admin_db.auth.admin.invite_user_by_email(email, invite_options)

        # Update status in the requests table
        admin_db.table("admin_requests").update(
            {"status": "approved"}).eq("id", request_id).execute()

        return {"status": "success", "message": f"Invite sent to {email}"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# --- 3. LOGGED IN: Sign Out ---


@router.post("/logout")
def sign_out(db: Client = Depends(get_supabase_client)):
    try:
        db.auth.sign_out()
        return {"status": "success", "message": "Logged out successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# --- 4. ADMIN: Promote User via OTP ---


@router.post("/profiles/promote")
def promote_user_to_admin(payload: PromotionRequest, db: Client = Depends(get_supabase_client)):
    try:
        # 1. Verify OTP
        verify_res = db.auth.verify_otp({
            "email": payload.admin_email,
            "token": payload.otp_code,
            "type": "email"
        })

        # FIX 4: Pylance check for 'user' attribute on the response
        if verify_res is None or not hasattr(verify_res, "user") or verify_res.user is None:
            raise HTTPException(
                status_code=401, detail="Invalid or expired OTP code")

        # 2. Authorization Check (RPC)
        check = db.rpc("has_role", {
            "_role": "admin",
            "_user_id": verify_res.user.id
        }).execute()

        if not check.data:
            raise HTTPException(
                status_code=403, detail="Unauthorized: You are not an admin")

        # 3. Execution
        db.table("user_roles").insert({
            "user_id": str(payload.user_id),
            "role": "admin"
        }).execute()

        return {"status": "success", "message": "User promoted successfully"}
    except Exception as e:
        raise HTTPException(
            status_code=400, detail=f"Promotion failed: {str(e)}")

# --- UPDATE USER ---


@router.patch("/user")
def update_profile(payload: ProfileUpdate, user=Depends(get_current_user), db: Client = Depends(get_supabase_client)):
    # Update the public profiles table
    return db.table("profiles").update({
        "full_name": payload.full_name
    }).eq("id", user.id).execute()

# --- DELETE USER (Admin Only) ---


@router.delete("/user/{target_user_id}")
def delete_user(target_user_id: str, admin=Depends(verify_admin), admin_db: Client = Depends(get_admin_client)):
    # 1. Delete from Auth (requires Service Role)
    admin_db.auth.admin.delete_user(target_user_id)

    # 2. Cleanup custom tables (if not handled by ON DELETE CASCADE)
    admin_db.table("user_roles").delete().eq(
        "user_id", target_user_id).execute()

    return {"status": "success", "message": "User account deleted successfully"}

# --- LOGIN: Set Cookiie ---


@router.post("/login")
def login(response: Response, credientials: Dict[str, str], db: Client = Depends(get_supabase_client)):
    auth_res = db.auth.sign_in_with_password({
        "email": credientials["email"],
        "password": credientials["password"]
    })

    if not auth_res.session:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Set the JWT in a HTTP-Only cookie
    response.set_cookie(
        key="access_token",
        value=auth_res.session.access_token,
        httponly=True,
        max_age=3600,
        samesite="lax"
    )

    return {"message": "Logged in successfully"}

# --- LOGOUT: Clear Cookie ---


@router.post("/logout")
def logout(response: Response):
    response.delete_cookie("access_token")
    return {"message": "Logged out"}
