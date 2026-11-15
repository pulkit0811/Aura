"""Health and service metadata endpoints."""

from typing import Literal

from fastapi import APIRouter
from pydantic import BaseModel

from app.core.config import Settings

router = APIRouter(tags=["system"])


class HealthResponse(BaseModel):
    """Response returned by the service health endpoint."""

    status: Literal["ok"]
    service: str
    environment: str


def build_health_response(settings: Settings) -> HealthResponse:
    return HealthResponse(
        status="ok",
        service="aura-api",
        environment=settings.environment,
    )


def create_health_router(settings: Settings) -> APIRouter:
    """Create the health router with the application settings captured."""

    health_router = APIRouter(tags=["system"])

    @health_router.get("/health", response_model=HealthResponse)
    async def health() -> HealthResponse:
        return build_health_response(settings)

    return health_router

