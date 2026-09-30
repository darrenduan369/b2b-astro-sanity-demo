export interface CreateInquiryInput {
  name: string;
  email: string;
  company?: string;
  country?: string;
  productId?: number;
  quantity?: number;
  message: string;
}

export interface InquiryValidationError {
  field:
    | 'name'
    | 'email'
    | 'quantity'
    | 'message';

  message: string;
}

export interface SubmitInquiryResponse {
  inquiryId: string;
}

export type InquiryErrorCode =
  | 'SUBMIT_FAILED'
  | 'NETWORK_ERROR'
  | 'UNKNOWN_ERROR';

export interface InquiryError {
  code: InquiryErrorCode;
  message: string;
}