from fastapi import FastAPI

from app.core.config import settings
from app.routers.auth import router as auth_router


app = FastAPI(
    title=settings.APP_NAME,
    description="MediKart Healthcare & Pharmacy API",
    version="1.0.0"
)


app.include_router(auth_router)


@app.get("/")
def root():
    return { "message": "Welcome to MediKart API", "status": "running" }


@app.get("/health")
def health_check():
    return { "status": "healthy" }