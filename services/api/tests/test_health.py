"""Tests for the initial API health endpoint."""

from fastapi.testclient import TestClient

from app.core.config import Settings
from app.main import create_app


def test_health_endpoint_returns_service_status() -> None:
    client = TestClient(create_app(Settings(environment="test")))

    response = client.get("/api/health")

    assert response.status_code == 200
    assert response.json() == {
        "status": "ok",
        "service": "aura-api",
        "environment": "test",
    }


def test_local_frontend_alias_is_allowed_in_development() -> None:
    client = TestClient(create_app(Settings(environment="test")))

    response = client.get(
        "/api/health",
        headers={"Origin": "http://127.0.0.1:3000"},
    )

    assert response.headers["access-control-allow-origin"] == "http://127.0.0.1:3000"

