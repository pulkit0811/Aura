"""Logging setup for the AURA API service."""

import logging

from app.core.config import Settings


def configure_logging(settings: Settings) -> None:
    """Configure consistent application logging once during startup."""

    logging.basicConfig(
        level=settings.log_level.upper(),
        format="%(asctime)s %(levelname)s %(name)s %(message)s",
    )

