from pydantic import BaseModel, EmailStr, Field
from uuid import UUID


class PromotionRequest(BaseModel):
    user_id: UUID
    admin_email: EmailStr
    otp_code: str = Field(..., min_length=6, max_length=6)


class AdminSignupRequest(BaseModel):
    email: EmailStr
    full_name: str


class ProfileUpdate(BaseModel):
    full_name: str
