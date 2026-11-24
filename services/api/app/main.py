"""FastAPI application entry point for AURA."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.health import create_health_router
from app.core.config import Settings, get_settings
from app.core.errors import register_exception_handlers
from app.core.logging import configure_logging


def create_app(settings: Settings | None = None) -> FastAPI:
    """Build and configure the AURA API application."""

    resolved_settings = settings or get_settings()
    configure_logging(resolved_settings)

    application = FastAPI(
        title=resolved_settings.app_name,
        version="0.1.0",
        description="Backend API for the AURA personal AI workspace.",
    )
    allowed_origins = [resolved_settings.web_origin]
    if resolved_settings.environment != "production":
        for local_origin in ("http://localhost:3000", "http://127.0.0.1:3000"):
            if local_origin not in allowed_origins:
                allowed_origins.append(local_origin)

    application.add_middleware(
        CORSMiddleware,
        allow_origins=allowed_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    application.include_router(create_health_router(resolved_settings), prefix="/api")
    register_exception_handlers(application)

    return application


app = create_app()

