import { AiServiceError, type AiErrorCode } from "../../types/aiError";

interface ErrorWithStatus {
  status?: number;
  code?: string | number;
  name?: string;
  message?: string;
}

export function toAiServiceError(error: unknown): AiServiceError {
  if (error instanceof AiServiceError) {
    return error;
  }

  if (typeof error !== "object" || error === null) {
    return new AiServiceError("UNKNOWN_ERROR", "Unknown AI service error");
  }

  const candidate = error as ErrorWithStatus;

  const errorName = candidate.name?.toLowerCase() ?? "";
  const errorMessage = candidate.message?.toLowerCase() ?? "";

  let code: AiErrorCode = "UNKNOWN_ERROR";

  if (
    errorName.includes("timeout") ||
    errorName.includes("abort") ||
    errorMessage.includes("timed out") ||
    errorMessage.includes("timeout")
  ) {
    code = "TIMEOUT";
  } else if (candidate.status === 401 || candidate.status === 403) {
    code = "AUTH_ERROR";
  } else if (candidate.status === 402) {
    code = "QUOTA_ERROR";
  } else if (candidate.status === 429) {
    code = "RATE_LIMIT";
  } else if (candidate.status !== undefined && candidate.status >= 500) {
    code = "PROVIDER_ERROR";
  }

  return new AiServiceError(
    code,
    candidate.message ?? "AI service request failed",
  );
}
