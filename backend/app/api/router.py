from fastapi import APIRouter
from app.api.admin.router import router as admin_router
from app.api.tours.router import router as tours_router

api_router = APIRouter(prefix="/api")

api_router.include_router(admin_router, prefix="/admin", tags=["Admin"])
api_router.include_router(tours_router, tags=["Tours"])
