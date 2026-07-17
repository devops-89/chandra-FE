import axios from 'axios';

import type {
  Booking,
  CreateBookingRequest,
  CreateBookingResponse,
  RescheduleBookingRequest,
  RescheduleBookingResponse,
} from '@/types/booking.types';
import type {
  CancelBookingRequest,
  CancelBookingResponse,
  CancelledBooking,
  CustomerBooking,
  CustomerBookingsResponse,
} from '@/types/customerBooking.types';

import { userSecuredApi } from './config';

type BookingResponseEnvelope =
  | CreateBookingResponse
  | {
      success?: boolean;
      statusCode?: number;
      message?: string;
      data?: Booking | CreateBookingResponse['data'];
    };

const extractBackendMessage = (data: unknown): string | null => {
  if (!data || typeof data !== 'object') return null;
  const record = data as Record<string, unknown>;
  if (typeof record.message === 'string' && record.message.trim()) {
    return record.message;
  }
  return extractBackendMessage(record.data);
};

const extractBooking = (data: BookingResponseEnvelope): Booking => {
  const firstData = data.data;
  if (firstData && typeof firstData === 'object' && 'data' in firstData) {
    return (firstData as CreateBookingResponse['data']).data;
  }
  return firstData as Booking;
};

export const BookingControllers = {
  createBooking: async (payload: CreateBookingRequest): Promise<Booking> => {
    try {
      const response = await userSecuredApi.post<BookingResponseEnvelope>('/bookings', payload);
      return extractBooking(response.data);
    } catch (error) {
      const backendMessage = axios.isAxiosError(error) ? extractBackendMessage(error.response?.data) : null;
      if (process.env.NODE_ENV !== 'production') {
        console.error('Backend Error:', error);
      }
      throw new Error(backendMessage ?? (error instanceof Error ? error.message : 'Failed to create booking'));
    }
  },

  cancelBooking: async (payload: CancelBookingRequest): Promise<CancelledBooking> => {
    const response = await userSecuredApi.patch<CancelBookingResponse>('/bookings/cancel', payload);
    return response.data.data.data;
  },

  rescheduleBooking: async (bookingId: number, payload: RescheduleBookingRequest): Promise<Booking> => {
    const response = await userSecuredApi.patch<RescheduleBookingResponse>(`/bookings/reschedule/${bookingId}`, payload);
    return response.data.data.data;
  },

  getCustomerBookings: async (): Promise<CustomerBooking[]> => {
    const response = await userSecuredApi.get<CustomerBookingsResponse>('/bookings/all');
    return response.data.data.data;
  },
};
