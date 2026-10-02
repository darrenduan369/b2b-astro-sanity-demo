import OpenAI from "openai";
import type { AiProvider } from "../../../types/aiProvider";

export const siliconFlowProvider: AiProvider = {
  async generate(message: string): Promise<string> {
    const apiKey = import.meta.env.SILICONFLOW_API_KEY;

    if (!apiKey) {
      throw new Error("SILICONFLOW_API_KEY is not configured");
    }

    const client = new OpenAI({
      apiKey,
      baseURL: "https://api.siliconflow.com/v1",
    });

    const response = await client.chat.completions.create({
      model: "Qwen/Qwen3.5-9B",

      messages: [
        {
          role: "system",
          content:
            "You are a concise B2B industrial product assistant. Give clear and practical recommendations.",
        },
        {
          role: "user",
          content: message,
        },
      ],

      max_tokens: 300,
    });

    return response.choices[0]?.message.content ?? "";
  },
};
