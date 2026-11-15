"""API exception types and handlers."""

import logging
from collections.abc import Callable
from typing import Any

from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

logger = logging.getLogger(__name__)


class ApiError(Exception):
    """An expected application error with a stable public error code."""

    def __init__(self, code: str, message: str, status_code: int = 400) -> None:
        self.code = code
        self.message = message
        self.status_code = status_code
        super().__init__(message)


def _error_response(code: str, message: str, status_code: int) -> JSONResponse:
    return JSONResponse(
        status_code=status_code,
        content={"error": {"code": code, "message": message}},
    )


async def api_error_handler(_: Request, exc: ApiError) -> JSONResponse:
    return _error_response(exc.code, exc.message, exc.status_code)


async def http_error_handler(_: Request, exc: HTTPException) -> JSONResponse:
    detail = exc.detail if isinstance(exc.detail, str) else "Request failed"
    return _error_response("http_error", detail, exc.status_code)


async def validation_error_handler(
    _: Request, exc: RequestValidationError
) -> JSONResponse:
    return _error_response(
        "validation_error",
        "The request data is invalid.",
        422,
    )


async def unhandled_error_handler(_: Request, exc: Exception) -> JSONResponse:
    logger.exception("Unhandled API error", exc_info=exc)
    return _error_response(
        "internal_server_error",
        "An unexpected error occurred.",
        500,
    )


def register_exception_handlers(app: FastAPI) -> None:
    """Register the public error format for expected and unexpected failures."""

    handlers: dict[type[Exception], Callable[..., Any]] = {
        ApiError: api_error_handler,
        HTTPException: http_error_handler,
        RequestValidationError: validation_error_handler,
        Exception: unhandled_error_handler,
    }
    for exception_type, handler in handlers.items():
        app.add_exception_handler(exception_type, handler)

