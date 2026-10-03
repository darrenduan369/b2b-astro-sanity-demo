import type {
  CreateInquiryInput,
  InquiryError,
  SubmitInquiryResponse,
} from "../types/inquiry";

import type { Result } from "../types/result";
import { getSanityWriteClient } from "../lib/sanity/client";

export async function submitInquiry(
  inquiry: CreateInquiryInput,
): Promise<Result<SubmitInquiryResponse, InquiryError>> {
  try {
    const client = getSanityWriteClient();

    const now = new Date().toISOString();

    const document = await client.create({
      _type: "inquiry",

      name: inquiry.name,
      email: inquiry.email,
      company: inquiry.company,
      country: inquiry.country,

      productName: inquiry.productName,
      productSlug: inquiry.productSlug,

      quantity: inquiry.quantity,
      message: inquiry.message,

      status: "new",

      createdAt: now,
      updatedAt: now,
    });

    return {
      ok: true,
      data: {
        inquiryId: document._id,
      },
    };
  } catch (error) {
    console.error("Sanity inquiry create failed:", error);

    return {
      ok: false,
      error: {
        code: "SUBMIT_FAILED",
        message: "Failed to submit inquiry.",
      },
    };
  }
}
