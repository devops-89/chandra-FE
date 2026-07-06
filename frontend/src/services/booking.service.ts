import axios from 'axios';

import { api } from '@/api/axios';
import { ENDPOINTS } from '@/api/endpoints';
import type {
  Booking,
  CreateBookingRequest,
  CreateBookingResponse,
} from '@/types/booking.types';

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

export const createBookingService = async (
  payload: CreateBookingRequest
): Promise<Booking> => {
  try {
    const response =
      await api.post<BookingResponseEnvelope>(
        ENDPOINTS.CREATE_BOOKING,
        payload
      );

    return extractBooking(response.data);
  } catch (error) {
    const backendMessage = axios.isAxiosError(error)
      ? extractBackendMessage(error.response?.data)
      : null;

    if (process.env.NODE_ENV !== 'production') {
      console.error('Backend Error:', error);
    }

    throw new Error(
      backendMessage ??
      (error instanceof Error ? error.message : 'Failed to create booking')
    );
  }
};
