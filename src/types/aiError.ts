export type AiErrorCode =
  | "TIMEOUT"
  | "AUTH_ERROR"
  | "QUOTA_ERROR"
  | "RATE_LIMIT"
  | "PROVIDER_ERROR"
  | "INVALID_RESPONSE"
  | "UNKNOWN_ERROR";

export class AiServiceError extends Error {
  constructor(
    public readonly code: AiErrorCode,
    message: string,
  ) {
    super(message);
    this.name = "AiServiceError";
  }
}
