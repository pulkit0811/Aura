"""Application configuration loaded from environment variables."""

import os
from functools import lru_cache
from typing import Literal

from pydantic import BaseModel


class Settings(BaseModel):
    """Runtime settings for the AURA API service."""

    app_name: str = "AURA API"
    environment: Literal["development", "test", "production"] = "development"
    log_level: str = "INFO"
    api_host: str = "127.0.0.1"
    api_port: int = 8000
    web_origin: str = "http://localhost:3000"

    @classmethod
    def from_environment(cls) -> "Settings":
        """Build settings from the documented AURA_* environment variables."""

        return cls(
            app_name=os.getenv("AURA_APP_NAME", "AURA API"),
            environment=os.getenv(
                "AURA_ENV",
                os.getenv("AURA_ENVIRONMENT", "development"),
            ),
            log_level=os.getenv("AURA_LOG_LEVEL", "INFO"),
            api_host=os.getenv("AURA_API_HOST", "127.0.0.1"),
            api_port=int(os.getenv("AURA_API_PORT", "8000")),
            web_origin=os.getenv("AURA_WEB_ORIGIN", "http://localhost:3000"),
        )


@lru_cache
def get_settings() -> Settings:
    """Return a cached settings object for the current process."""

    return Settings.from_environment()

