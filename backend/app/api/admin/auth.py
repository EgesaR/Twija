# app/api/admin/auth.py
import os
from fastapi import APIRouter, Depends, HTTPException, Response
from supabase import Client
from typing import Dict

from app.dependencies.auth import (
    get_supabase_client,
    verify_admin,
)
from app.core.supabase import get_admin_client
from app.models.admin import PromotionRequest

router = APIRouter()

ENV = os.getenv("ENV", "development")


# --- AUTH: Login ---
@router.post("/login")
def login(
    response: Response,
    credentials: Dict[str, str],
    db: Client = Depends(get_supabase_client),
):
    try:
        print(f"DEBUG: Login attempt for email: {credentials.get('email')}")

        auth_res = db.auth.sign_in_with_password({
            "email": credentials["email"],
            "password": credentials["password"],
        })

        if not auth_res.session:
            raise HTTPException(status_code=401, detail="Invalid credentials")

        response.set_cookie(
            key="access_token",
            value=auth_res.session.access_token,
            httponly=True,
            max_age=auth_res.session.expires_in,
            samesite="lax",
            secure=ENV == "production",
        )

        return {
            "status": "success",
            "message": "Logged in successfully",
            "access_token": auth_res.session.access_token,
            "refresh_token": auth_res.session.refresh_token,
            "user": auth_res.user,
        }
    except Exception as e:
        error_msg = str(e)
        print(f"Detailed Auth error: {error_msg}")

        raise HTTPException(
            status_code=401, detail=error_msg if error_msg else "Authentication failed")


# --- AUTH: Logout ---
@router.post("/logout")
def logout(
    response: Response,
    db: Client = Depends(get_supabase_client),
):
    try:
        db.auth.sign_out()
    except Exception:
        pass

    response.delete_cookie("access_token")
    return {"status": "success", "message": "Logged out successfully"}


# --- ADMIN: Promote user via OTP ---
@router.post("/profiles/promote")
def promote_user_to_admin(
    payload: PromotionRequest,
    db: Client = Depends(get_supabase_client),
):
    try:
        verify_res = db.auth.verify_otp({
            "email": payload.admin_email,
            "token": payload.otp_code,
            "type": "email",
        })

        if not verify_res or not verify_res.user:
            raise HTTPException(
                status_code=401, detail="Invalid or expired OTP")

        check = db.rpc("has_role", {
            "_role": "admin",
            "_user_id": verify_res.user.id,
        }).execute()

        if not check.data:
            raise HTTPException(status_code=403, detail="Re-auth failed")

        db.table("user_roles").insert({
            "user_id": str(payload.user_id),
            "role": "admin",
        }).execute()

        return {"status": "success", "message": "User promoted successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# --- ADMIN: Delete user ---
@router.delete("/user/{target_user_id}")
def delete_user(
    target_user_id: str,
    admin=Depends(verify_admin),
    admin_db: Client = Depends(get_admin_client),
):
    try:
        admin_db.auth.admin.delete_user(target_user_id)
        admin_db.table("user_roles").delete().eq(
            "user_id", target_user_id
        ).execute()

        return {"status": "success", "message": "User deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
