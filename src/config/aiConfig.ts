const provider = import.meta.env.AI_PROVIDER;
const model = import.meta.env.AI_MODEL;
const maxTokensValue = Number(import.meta.env.AI_MAX_TOKENS ?? "150");
const timeoutMsValue = Number(import.meta.env.AI_TIMEOUT_MS ?? "10000");

if (!provider) {
  throw new Error("AI_PROVIDER is not configured");
}

if (!model) {
  throw new Error("AI_MODEL is not configured");
}

if (!Number.isInteger(maxTokensValue) || maxTokensValue <= 0) {
  throw new Error("AI_MAX_TOKENS must be a positive integer");
}

if (!Number.isInteger(timeoutMsValue) || timeoutMsValue <= 0) {
  throw new Error("AI_TIMEOUT_MS must be a positive integer");
}

export const AI_CONFIG = {
  provider,
  model,
  maxTokens: maxTokensValue,
  timeoutMs: timeoutMsValue,
} as const;
