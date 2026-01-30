from pydantic import BaseModel, EmailStr, Field
from uuid import UUID


class AdminSignupRequest(BaseModel):
    email: EmailStr
    full_name: str


class PromotionRequest(BaseModel):
    user_id: UUID
    admin_email: EmailStr
    otp_code: str = Field(..., min_length=6, max_length=6)
