import os

os.environ["DATABASE_URL"] = "sqlite:///./test_medikart.db"
os.environ["SECRET_KEY"] = "test-secret-key"
os.environ["CORS_ORIGINS"] = "http://localhost:5173"


from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.main import app
from app.database.base import Base
from app.database.database import get_db


TEST_DATABASE_URL = "sqlite:///./test_medikart.db"

engine = create_engine(
    TEST_DATABASE_URL,
    connect_args={
        "check_same_thread": False
    },
)

TestingSessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)


Base.metadata.create_all(
    bind=engine
)


def override_get_db():

    db = TestingSessionLocal()

    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[
    get_db
] = override_get_db


client = TestClient(app)


def test_register_user():

    response = client.post(
        "/api/auth/register",
        json={
            "full_name": "Test User",
            "email": "test@example.com",
            "password": "Password@123",
            "phone": "9876543210",
        },
    )

    assert response.status_code == 201

    data = response.json()

    assert data["email"] == "test@example.com"

    assert "password" not in data
    assert "hashed_password" not in data


def test_duplicate_email():

    response = client.post(
        "/api/auth/register",
        json={
            "full_name": "Test User 2",
            "email": "test@example.com",
            "password": "Password@123",
        },
    )

    assert response.status_code == 409


def test_login():

    response = client.post(
        "/api/auth/login",
        data={
            "username": "test@example.com",
            "password": "Password@123",
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert "access_token" in data
    assert data["token_type"] == "bearer"


def test_invalid_login():

    response = client.post(
        "/api/auth/login",
        data={
            "username": "test@example.com",
            "password": "WrongPassword",
        },
    )

    assert response.status_code == 401


def test_me_without_token():

    response = client.get(
        "/api/auth/me"
    )

    assert response.status_code == 401


def test_me_with_token():

    login_response = client.post(
        "/api/auth/login",
        data={
            "username": "test@example.com",
            "password": "Password@123",
        },
    )

    token = login_response.json()["access_token"]

    response = client.get(
        "/api/auth/me",
        headers={
            "Authorization": f"Bearer {token}"
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert data["email"] == "test@example.com"

    assert "hashed_password" not in data
    assert "password" not in data