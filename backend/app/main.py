import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.router import api_router

origins = [
    os.getenv("FRONTEND_URL", "http://localhost:5173"),
    "http://127.0.0.1:5173",
]

app = FastAPI(
    title="Kigali Walking Tours API",
    description="Backend service for managing tourism experiences",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


@app.get("/", tags=["System"])
def root():
    return {
        "message": "Kigali Walking Tours API is online",
        "environment": os.getenv("ENV", "development"),
    }


@app.get("/health", tags=["System"])
def health():
    return {"status": "healthy"}
