export interface AiAssistantRequest {
  message: string;
}

export interface AiProductRecommendation {
  productSlug: string;
  productName: string;
  reason: string;
}

export interface AiAssistantResponse {
  recommendation: AiProductRecommendation;
}