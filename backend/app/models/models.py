from pydantic import BaseModel, EmailStr, Field
from uuid import UUID
from datetime import datetime
from typing import Optional

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
    name: str
    description: Optional[str] = None
    price: float
    duration: str  # e.g., "3 hours" or "Full Day"
    location: str
    image_url: Optional[str] = None
    created_at: datetime

    # This allows Pydantic to work with Supabase's dictionary output
    class Config:
        from_attributes = True