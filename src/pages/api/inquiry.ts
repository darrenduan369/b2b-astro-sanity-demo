import type { APIRoute } from "astro";
import type {
  InquiryRequest,
  InquiryResponse,
  CreateInquiryInput,
} from "../../types/inquiry";
import { validateInquiry } from "../../validators/inquiryValidator";
import { submitInquiry } from "../../services/inquiryService";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body: unknown = await request.json();

    // 1. 先检查最基本的 HTTP 请求结构
    if (
      typeof body !== "object" ||
      body === null ||
      !("name" in body) ||
      !("email" in body) ||
      !("message" in body)
    ) {
      const response: InquiryResponse = {
        success: false,
        message: "Invalid inquiry data.",
      };

      return new Response(JSON.stringify(response), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // 2. 基础结构通过后，再转换成 InquiryRequest
    const requestBody = body as InquiryRequest;

    // 3. 转成 Service 层需要的 CreateInquiryInput
    const input: CreateInquiryInput = {
      name: requestBody.name,
      email: requestBody.email,
      company: requestBody.company,
      country: requestBody.country,
      productName: requestBody.productName,
      productSlug: requestBody.productSlug,
      quantity: requestBody.quantity,
      message: requestBody.message,
    };

    // 4. 复用已有 Validator
    const validationResult = validateInquiry(input);

    if (!validationResult.ok) {
      const response: InquiryResponse = {
        success: false,
        message: validationResult.error.message,
      };

      return new Response(JSON.stringify(response), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // 5. 复用已有 Service
    const submitResult = await submitInquiry(validationResult.data);

    if (!submitResult.ok) {
      const response: InquiryResponse = {
        success: false,
        message: submitResult.error.message,
      };

      return new Response(JSON.stringify(response), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // 6. 真正提交成功后才返回 200
    const response: InquiryResponse = {
      success: true,
      message: "Inquiry received successfully.",
      inquiryId: submitResult.data.inquiryId,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch {
    const response: InquiryResponse = {
      success: false,
      message: "Failed to process inquiry.",
    };

    return new Response(JSON.stringify(response), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
