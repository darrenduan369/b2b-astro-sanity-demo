import type { CreateInquiryInput } from "../types/inquiry";

export function mapFormDataToInquiry(formData: FormData): CreateInquiryInput {
  const quantityValue = formData.get("quantity");

  return {
    name: String(formData.get("name") ?? "").trim(),

    email: String(formData.get("email") ?? "").trim(),

    company: String(formData.get("company") ?? "").trim() || undefined,

    country: String(formData.get("country") ?? "").trim() || undefined,

    quantity: quantityValue ? Number(quantityValue) : undefined,

    productName: String(formData.get("productName") ?? "").trim(),

    productSlug: String(formData.get("productSlug") ?? "").trim(),

    message: String(formData.get("message") ?? "").trim(),
  };
}
