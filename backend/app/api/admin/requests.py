# app/api/admin/requests.py
import os
from fastapi import APIRouter, Depends, HTTPException
from supabase import Client
from typing import Any, Dict, cast

from app.dependencies.auth import (
    get_supabase_client,
    get_current_user,
)
from app.core.supabase import get_admin_client
from app.models.admin import AdminSignupRequest
from app.models.profile import ProfileUpdate

router = APIRouter()

ENV = os.getenv("ENV", "development")
BASE_URL = (
    "https://kigaliwalkingtour.com"
    if ENV == "production"
    else "http://localhost:5173"
)


# --- PUBLIC: Request admin access ---
@router.post("/request-admin")
def request_admin_access(
    payload: AdminSignupRequest,
    db: Client = Depends(get_supabase_client),
):
    try:
        db.table("admin_requests").insert({
            "email": payload.email,
            "full_name": payload.full_name,
            "status": "pending",
        }).execute()

        return {"status": "success", "message": "Request submitted"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# --- ADMIN: Approve admin request ---
@router.post("/approve-admin/{request_id}")
def approve_admin_request(
    request_id: str,
    admin_db: Client = Depends(get_admin_client),
):
    try:
        res = admin_db.table("admin_requests").select("*") \
            .eq("id", request_id).single().execute()

        data = cast(Dict[str, Any], res.data)

        if not data:
            raise HTTPException(status_code=404, detail="Request not found")

        email = str(data.get("email", ""))
        full_name = str(data.get("full_name", ""))

        admin_db.auth.admin.invite_user_by_email(
            email=email,
            options={
                "redirect_to": f"{BASE_URL}/admin/finish-setup",
                "data": {
                    "full_name": full_name
                }
            }
        )

        admin_db.table("admin_requests").update(
            {"status": "approved"}
        ).eq("id", request_id).execute()

        return {
            "status": "success",
            "message": f"Invite sent to {email}",
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# --- USER: Update own profile ---
@router.patch("/user")
def update_profile(
    payload: ProfileUpdate,
    user=Depends(get_current_user),
    db: Client = Depends(get_supabase_client),
):
    try:
        return db.table("profiles").update({
            "full_name": payload.full_name,
        }).eq("id", user.id).execute()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
