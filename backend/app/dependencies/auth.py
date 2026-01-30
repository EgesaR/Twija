from fastapi import Request, Depends, HTTPException
from supabase import Client
from app.core.supabase import get_supabase_client


async def get_current_user(
    request: Request,
    db: Client = Depends(get_supabase_client),
):
    token = request.cookies.get("access_token")

    if not token:
        auth = request.headers.get("Authorization")
        if auth and auth.startswith("Bearer "):
            token = auth.replace("Bearer ", "")

    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    try:
        user_res = db.auth.get_user(token)
        if not user_res or not user_res.user:
            raise HTTPException(status_code=401)
        return user_res.user
    except:
        raise HTTPException(status_code=401, detail="Invalid session")


async def verify_admin(
    user=Depends(get_current_user),
    db: Client = Depends(get_supabase_client),
):
    res = db.rpc("has_role", {
        "_role": "admin",
        "_user_id": user.id,
    }).execute()

    if not res.data:
        raise HTTPException(status_code=403, detail="Admin required")

    return user
