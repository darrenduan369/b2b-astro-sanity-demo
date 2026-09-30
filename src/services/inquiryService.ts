import type {
  CreateInquiryInput,
  InquiryError,
  SubmitInquiryResponse,
} from '../types/inquiry';

import type { Result } from '../types/result';

export async function submitInquiry(
  inquiry: CreateInquiryInput,
): Promise<
  Result<SubmitInquiryResponse, InquiryError>
> {
  try {
    await new Promise((resolve) =>
      setTimeout(resolve, 1500),
    );

    return {
      ok: true,
      data: {
        inquiryId: 'INQ-001',
      },
    };
  } catch {
    return {
      ok: false,
      error: {
        code: 'SUBMIT_FAILED',
        message: 'Failed to submit inquiry.',
      },
    };
  }
}