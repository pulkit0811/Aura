export type HealthResponse = {
  status: "ok";
  service: string;
  environment: string;
};

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

function isHealthResponse(value: unknown): value is HealthResponse {
  if (!value || typeof value !== "object") {
    return false;
  }

  const response = value as Record<string, unknown>;
  return (
    response.status === "ok" &&
    typeof response.service === "string" &&
    typeof response.environment === "string"
  );
}

export async function getHealth(signal?: AbortSignal): Promise<HealthResponse> {
  const response = await fetch(`${apiBaseUrl}/api/health`, {
    signal,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new ApiError("The backend returned an error.", response.status);
  }

  const payload: unknown = await response.json();
  if (!isHealthResponse(payload)) {
    throw new ApiError("The backend returned an invalid health response.", 502);
  }

  return payload;
}

