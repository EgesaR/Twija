from pydantic import BaseModel, EmailStr, Field
from uuid import UUID
from datetime import datetime
from typing import Optional, Any, List


class PromotionRequest(BaseModel):
    user_id: UUID
    admin_email: EmailStr
    otp_code: str = Field(..., min_length=6, max_length=6)


class AdminSignupRequest(BaseModel):
    email: EmailStr
    full_name: str


class ProfileUpdate(BaseModel):
    full_name: str


class TourSchema(BaseModel):
    id: str
    title: str
    description: Optional[str] = None
    category: Optional[str] = None
    price: float
    duration: Optional[str] = None  # e.g., "3 hours" or "Full Day"
    images: Any
    adventureSteps: Optional[List[str]] = []
    slots: Optional[int] = 0
    numberPerPerson: Optional[int] = 1
    startingPoint: Optional[str] = "Kigali"
    created_at: datetime

    # This allows Pydantic to work with Supabase's dictionary output
    class Config:
        from_attributes = True
