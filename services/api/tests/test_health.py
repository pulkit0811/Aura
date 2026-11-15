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

