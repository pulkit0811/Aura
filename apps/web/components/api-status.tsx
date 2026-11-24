"use client";

import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  ErrorState,
  LoadingState,
} from "@/components/ui/feedback-state";
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

  if (state === "checking") {
    return (
      <div className="status-card" aria-live="polite">
        <LoadingState
          compact
          title="Checking backend connection"
          description="Verifying that the AURA API service is available."
        />
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="status-card" aria-live="polite">
        <ErrorState
          compact
          title="Backend connection unavailable"
          description="Start the API service to connect AURA."
          action={
            <Button size="sm" type="button" onClick={() => checkHealth()}>
              Retry connection
            </Button>
          }
        />
      </div>
    );
  }

  const tone =
    state === "connected" ? "success" : "neutral";

  return (
    <div className="status-card" aria-live="polite">
      <div>
        <p className="status-heading">Backend connection</p>
        <p className="status-description">{`${health?.service} is running in ${health?.environment}.`}</p>
      </div>
      <StatusBadge tone={tone}>
        Connected
      </StatusBadge>
    </div>
  );
}

