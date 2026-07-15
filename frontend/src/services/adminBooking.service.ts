import { api } from '@/api/axios';
import { ENDPOINTS } from '@/api/endpoints';
import type {
  AdminBooking,
  BookingPagination,
  GetAdminBookingsResponse,
} from '@/types/admin/bookings.types';

export const getAdminBookingsService = async (
  page = 1,
  limit = 30,
): Promise<{
  bookings: AdminBooking[];
  pagination: BookingPagination;
}> => {
  const response =
    await api.get<GetAdminBookingsResponse>(
      `${ENDPOINTS.ADMIN_BOOKINGS}?page=${page}&limit=${limit}`,
    );

  return {
    bookings: response.data.data.data,
    pagination: response.data.data.pagination,
  };
};