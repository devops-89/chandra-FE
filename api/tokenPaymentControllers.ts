import { userSecuredApi } from './config';
import type { CreateTokenPaymentLinkResponse, TokenPaymentLink } from '@/types/customer/tokenPayment.types';

export const TokenPaymentControllers = {
  createTokenPaymentLink: async (): Promise<TokenPaymentLink> => {
    const response = await userSecuredApi.post<CreateTokenPaymentLinkResponse>('/users/customer/token-payment-link');
    return response.data.data.data;
  },
};
