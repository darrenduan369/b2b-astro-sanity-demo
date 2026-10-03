import type {
  CreateInquiryInput,
  InquiryValidationError,
} from "../types/inquiry";

import type { Result } from "../types/result";

export function validateInquiry(
  inquiry: CreateInquiryInput,
): Result<CreateInquiryInput, InquiryValidationError> {
  if (!inquiry.name.trim()) {
    return {
      ok: false,
      error: {
        field: "name",
        message: "Please enter your name.",
      },
    };
  }

  if (!inquiry.email.trim() || !inquiry.email.includes("@")) {
    return {
      ok: false,
      error: {
        field: "email",
        message: "Please enter a valid email.",
      },
    };
  }

  if (inquiry.quantity !== undefined && inquiry.quantity <= 0) {
    return {
      ok: false,
      error: {
        field: "quantity",
        message: "Quantity must be greater than 0.",
      },
    };
  }

  if (!inquiry.message.trim()) {
    return {
      ok: false,
      error: {
        field: "message",
        message: "Please enter your inquiry message.",
      },
    };
  }

  return {
    ok: true,
    data: inquiry,
  };
}
