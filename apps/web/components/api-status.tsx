"use client";

import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { getHealth, type HealthResponse } from "@/lib/api";

type RequestState = "checking" | "connected" | "error";

export function ApiStatus() {
  const [state, setState] = useState<RequestState>("checking");
  const [health, setHealth] = useState<HealthResponse | null>(null);

  const checkHealth = useCallback((signal?: AbortSignal) => {
    setState("checking");

    getHealth(signal)
      .then((response) => {
        setHealth(response);
        setState("connected");
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setHealth(null);
        setState("error");
      });
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    checkHealth(controller.signal);

    return () => controller.abort();
  }, [checkHealth]);

  const label =
    state === "connected"
      ? "Connected"
      : state === "error"
        ? "Unavailable"
        : "Checking";

  const tone =
    state === "connected" ? "success" : state === "error" ? "danger" : "neutral";

  return (
    <div className="status-card" aria-live="polite">
      <div>
        <p className="status-heading">Backend connection</p>
        <p className="status-description">
          {health
            ? `${health.service} is running in ${health.environment}.`
            : state === "error"
              ? "Start the API service to connect AURA."
              : "Checking the AURA API service..."}
        </p>
        {state === "error" && (
          <Button
            className="retry-button"
            size="sm"
            type="button"
            onClick={() => checkHealth()}
          >
            Retry connection
          </Button>
        )}
      </div>
      <StatusBadge tone={tone}>
        {label}
      </StatusBadge>
    </div>
  );
}

