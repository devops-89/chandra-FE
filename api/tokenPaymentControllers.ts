import type { CreateTokenPaymentLinkResponse, TokenPaymentLink } from '@/types/customer/tokenPayment.types';

import { userSecuredApi } from './config';

export const TokenPaymentControllers = {
  createTokenPaymentLink: async (): Promise<TokenPaymentLink> => {
    const response = await userSecuredApi.post<CreateTokenPaymentLinkResponse>('/users/customer/token-payment-link');
    return response.data.data.data;
  },
};
