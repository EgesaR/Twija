# app/api/admin/router.py
from fastapi import APIRouter
from app.api.admin.auth import router as auth_router
from app.api.admin.requests import router as requests_router

router = APIRouter()

router.include_router(auth_router)
router.include_router(requests_router)
