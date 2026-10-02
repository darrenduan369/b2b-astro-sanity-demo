import { GoogleGenAI } from "@google/genai";
import type { AiProvider } from "../../../types/aiProvider";

export const geminiProvider: AiProvider = {
  async generate(message: string): Promise<string> {
    const apiKey = import.meta.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    const ai = new GoogleGenAI({
      apiKey,
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: message,
    });

    return response.text ?? "";
  },
};
