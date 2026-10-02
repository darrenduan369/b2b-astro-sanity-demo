import type { AiProvider, AiProviderName } from "../types/aiProvider";
import { fetchProducts } from "./productService";
import { AI_CONFIG } from "../config/aiConfig";
import { AiServiceError } from "../types/aiError";
import { deepSeekProvider } from "./ai/providers/deepSeekProvider";
import { geminiProvider } from "./ai/providers/geminiProvider";
import { siliconFlowProvider } from "./ai/providers/siliconFlowProvider";
import type { AiProductRecommendation } from "../types/aiAssistant";

function getAiProvider(): AiProvider {
  const providerName = AI_CONFIG.provider as AiProviderName;

  switch (providerName) {
    case "deepseek":
      return deepSeekProvider;

    case "gemini":
      return geminiProvider;

    case "siliconflow":
      return siliconFlowProvider;

    default:
      throw new Error(
        `Unsupported AI provider: ${providerName ?? "undefined"}`,
      );
  }
}

function isAiProductRecommendation(
  value: unknown,
): value is AiProductRecommendation {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return (
    "productSlug" in value &&
    typeof value.productSlug === "string" &&
    "productName" in value &&
    typeof value.productName === "string" &&
    "reason" in value &&
    typeof value.reason === "string"
  );
}

export async function askAiAssistant(
  message: string,
): Promise<AiProductRecommendation> {
  const provider = getAiProvider();

  const products = await fetchProducts();
  const candidateProducts = selectCandidateProducts(products, message);

  const productContext = candidateProducts
    .map((product) => {
      const description = product.description?.trim().slice(0, 160) ?? "";

      return [
        `slug=${product.slug}`,
        `name=${product.name}`,
        `category=${product.category}`,
        `price=${product.price}`,
        description ? `description=${description}` : "",
      ]
        .filter(Boolean)
        .join(" | ");
    })
    .join("\n");

  const prompt = `
    You are a B2B product recommendation assistant.

    Catalog:
    ${productContext}

    Customer request:
    ${message}

    Select at most one product from the catalog.

    Rules:
    - Never invent products.
    - If there is no suitable match, return empty productSlug and productName.
    - Keep reason under 30 words.
    - Return JSON only.

    {
    "productSlug": "",
    "productName": "",
    "reason": ""
    }
    `;

  const rawResponse = await provider.generate(prompt);

  let parsed: unknown;

  try {
    parsed = JSON.parse(rawResponse);
  } catch {
    throw new AiServiceError("INVALID_RESPONSE", "AI returned invalid JSON");
  }

  if (!isAiProductRecommendation(parsed)) {
    throw new AiServiceError(
      "INVALID_RESPONSE",
      "AI returned invalid recommendation structure",
    );
  }

  if (parsed.productSlug.trim() === "" || parsed.productName.trim() === "") {
    return parsed;
  }

  const matchedProduct = products.find(
    (product) =>
      product.slug === parsed.productSlug &&
      product.name === parsed.productName,
  );

  if (!matchedProduct) {
    return {
      productSlug: "",
      productName: "",
      reason: "No matching product exists in the current catalog.",
    };
  }

  return {
    productSlug: matchedProduct.slug,
    productName: matchedProduct.name,
    reason: parsed.reason,
  };
}

function selectCandidateProducts<
  T extends {
    name: string;
    category: string;
    description?: string;
  },
>(products: T[], message: string): T[] {
  const keywords = message
    .toLowerCase()
    .split(/\s+/)
    .map((keyword) => keyword.replace(/[^a-z0-9]/g, ""))
    .filter((keyword) => keyword.length >= 3);

  const scoredProducts = products.map((product) => {
    const searchableText = [
      product.name,
      product.category,
      product.description ?? "",
    ]
      .join(" ")
      .toLowerCase();

    const score = keywords.reduce((total, keyword) => {
      return searchableText.includes(keyword) ? total + 1 : total;
    }, 0);

    return {
      product,
      score,
    };
  });

  const matchedProducts = scoredProducts
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((item) => item.product);

  return matchedProducts.length > 0 ? matchedProducts : products.slice(0, 5);
}
