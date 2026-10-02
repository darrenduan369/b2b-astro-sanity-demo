export type AiProviderName = "deepseek" | "gemini" | "siliconflow";

export interface AiProvider {
  generate(message: string): Promise<string>;
}
