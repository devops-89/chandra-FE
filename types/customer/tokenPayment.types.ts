export interface TokenPaymentLink {
  paymentLinkId: string;
  paymentLink: string;
  paymentId: number;
  amount: number;
}

export interface CreateTokenPaymentLinkResponse {
  success: boolean;
  statusCode: number;
  message: string;

  data: {
    success: boolean;
    message: string;
    data: TokenPaymentLink;
  };
}