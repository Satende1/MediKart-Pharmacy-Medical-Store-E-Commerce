from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.security import create_access_token
from app.database.database import get_db
from app.schemas.auth import Token
from app.schemas.user import UserCreate, UserResponse
from app.services.auth_service import (
    authenticate_user,
    create_user,
    get_user_by_email,
)
from app.utils.dependencies import get_current_user


router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"]
)


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def register(
    user_data: UserCreate,
    db: Session = Depends(get_db),
):

    existing_user = get_user_by_email(
        db,
        user_data.email
    )

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email is already registered"
        )

    try:
        user = create_user(
            db,
            user_data
        )

        return user

    except IntegrityError:
        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email or phone number is already registered"
        )


@router.post(
    "/login",
    response_model=Token,
)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):

    user = authenticate_user(
        db,
        form_data.username,
        form_data.password
    )

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={
                "WWW-Authenticate": "Bearer"
            },
        )

    access_token = create_access_token(
        user_id=user.id
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }


@router.get(
    "/me",
    response_model=UserResponse,
)
def get_me(
    current_user=Depends(get_current_user)
):

    return current_user