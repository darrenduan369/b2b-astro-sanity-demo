import type { APIRoute } from "astro";
import type {
  AiAssistantRequest,
  AiAssistantResponse,
} from "../../types/aiAssistant";
import { askAiAssistant } from "../../services/aiAssistantService";
import { AiServiceError } from "../../types/aiError";
import { toAiServiceError } from "../../services/ai/toAiServiceError";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({
        error: "Invalid request body",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("message" in body) ||
    typeof body.message !== "string" ||
    body.message.trim() === ""
  ) {
    return new Response(
      JSON.stringify({
        error: "Message is required",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  const data: AiAssistantRequest = {
    message: body.message.trim(),
  };

  try {
    const recommendation = await askAiAssistant(data.message);

    const response: AiAssistantResponse = { recommendation };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    const aiError = toAiServiceError(error);

    console.error("AI assistant error:", aiError);

    const status =
      aiError.code === "AUTH_ERROR"
        ? 502
        : aiError.code === "QUOTA_ERROR"
          ? 503
          : aiError.code === "RATE_LIMIT"
            ? 429
            : aiError.code === "TIMEOUT"
              ? 504
              : 500;

    return new Response(
      JSON.stringify({
        error: aiError.code,
      }),
      {
        status,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
};
