import { api } from '@/api/axios';
import { ENDPOINTS } from '@/api/endpoints';
import type {
  CustomerBooking,
  CustomerBookingsResponse,
} from '@/types/customerBooking.types';

export const getCustomerBookingsService = async (): Promise<CustomerBooking[]> => {
  const response =
    await api.get<CustomerBookingsResponse>(
      ENDPOINTS.GET_CUSTOMER_BOOKINGS
    );

  return response.data.data.data;
};