import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# Import your router from the file where you wrote the promote_user code
from app.api.admin.profiles import router as admin_router
from app.api.api import router as api_router

origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:5176",
    "http://localhost:5177",
    "http://localhost:5178",
    "http://localhost:5179",
    "http://localhost:5180",
]

app = FastAPI(title="My Supabase Project")

app.add_middleware(
    CORSMiddleware, 
    allow_origins=origins,
    allow_credentials=True, 
    allow_methods=["*"], 
    allow_headers=["*"]
)

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
