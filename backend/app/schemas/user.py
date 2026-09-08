from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class UserCreate(BaseModel):
    full_name: str = Field(
        ...,
        min_length=2,
        max_length=100
    )

    email: EmailStr

    password: str = Field(
        ...,
        min_length=8,
        max_length=128
    )

    phone: str | None = Field(
        default=None,
        max_length=20
    )


class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    phone: str | None
    is_active: bool
    is_verified: bool
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )