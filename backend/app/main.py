
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.routers.api import router

app = FastAPI(
    title=settings.app_name,
    version="1.0.0",
)

# Allow local React development servers
allowed_origins = [
    "http://127.0.0.1:5173",
    "http://localhost:5173",
]

# Include any additional origins configured in environment settings
allowed_origins.extend(settings.cors_origin_list)

# Remove duplicate origins
allowed_origins = list(set(allowed_origins))

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "schemeta-api",
    }
