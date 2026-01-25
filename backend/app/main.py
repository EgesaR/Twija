from fastapi import FastAPI
import os
# Import your router from the file where you wrote the promote_user code
from app.api.admin.profiles import router as admin_router
from app.api.api import router as api_router

app = FastAPI(title="My Supabase Project")

# This "attaches" your routes to the main app
# You can add a prefix so all those routes start with /api
app.include_router(
    admin_router, 
    prefix="/api/admin",
    tags=["Admin Controls"]
)

app.include_router(
    api_router, 
    prefix="/api",
    tags=["Fetching Basic Data"]
)


@app.get("/")
async def root():
    return {
        "message": "Hello from backend!",
        "instance": os.getenv("HOSTNAME", "local")
    }


@app.get("/health")
async def health():
    return {"status": "ok"}
