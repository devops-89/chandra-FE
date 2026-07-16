import { userServiceApi } from '@/api/axios';
import { ENDPOINTS } from '@/api/endpoints';
import type {
  CreateTokenPaymentLinkResponse,
  TokenPaymentLink,
} from '@/types/customer/tokenPayment.types';

export const createTokenPaymentLinkService =
  async (): Promise<TokenPaymentLink> => {
    const response =
      await userServiceApi.post<CreateTokenPaymentLinkResponse>(
        ENDPOINTS.CUSTOMER_TOKEN_PAYMENT_LINK,
      );

    return response.data.data.data;
  };