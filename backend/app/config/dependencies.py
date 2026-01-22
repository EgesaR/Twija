from fastapi import Request, Depends, HTTPException
from supabase import create_client, Client
from app.core.supabase import settings
from typing import cast, Any, Dict, Optional

_supabase_client: Client | None = None

# Standard client for regular operations (respecting RLS policies)
def get_supabase_client() -> Client:
    global _supabase_client
    if _supabase_client is None:
        _supabase_client = create_client(
            settings.supabase_url, settings.supabase_anon_key
        )
    return _supabase_client

# Admin client with service role key (bypassing RLS policies)
def get_admin_client() -> Client:
    return create_client(settings.supabase_url, settings.supabase_service_role_key)


async def get_current_user(request: Request, db: Client = Depends(get_supabase_client)):
    # 1. Try to get token from Cookie or Authorization Header
    token = request.cookies.get(
        "access_token") or request.headers.get("Authorization")
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    # Clean 'Bearer' prefix if present
    token = token.replace("Bearer ", "")

    # 2. Ask Supabase who this token belongs to
    try:
        user_res = db.auth.get_user(token)

        if not user_res is None or not hasattr(user_res, "user") or user_res.user is None:
            raise HTTPException(status_code=401, detail="Invalid session or token")

        return user_res.user
    except Exception as e:
        raise HTTPException(status_code=401, detail="Authentication failed")


# Helper to check for ADMIN specifically


async def verify_admin(user=Depends(get_current_user), db: Client = Depends(get_supabase_client)):
    check = db.rpc("has_role", {
        "_role": "admin",
        "_user_id": user.id
    }).execute()
    if not check.data:
        raise HTTPException(
            status_code=403, detail="Unauthorized: You are not an admin")
    return user
