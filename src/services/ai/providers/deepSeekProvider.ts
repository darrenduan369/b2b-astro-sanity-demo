import OpenAI from "openai";
import type { AiProvider } from "../../../types/aiProvider";
import { AI_CONFIG } from "../../../config/aiConfig";

export const deepSeekProvider: AiProvider = {
  async generate(message: string): Promise<string> {
    const apiKey = import.meta.env.DEEPSEEK_API_KEY;

    if (!apiKey) {
      throw new Error("DEEPSEEK_API_KEY is not configured");
    }

    const client = new OpenAI({
      apiKey,
      baseURL: "https://api.deepseek.com",
      timeout: AI_CONFIG.timeoutMs,
    });

    const response = await client.chat.completions.create({
      model: AI_CONFIG.model,

      messages: [
        {
          role: "system",
          content:
            "You are a concise B2B industrial product assistant. Recommend only relevant products and keep the response practical and brief.",
        },
        {
          role: "user",
          content: message,
        },
      ],

      max_tokens: AI_CONFIG.maxTokens,
    });

    return response.choices[0]?.message.content ?? "";
  },
};
