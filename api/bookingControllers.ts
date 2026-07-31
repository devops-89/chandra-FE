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

  getCustomerBookings: async (page = 1, limit = 10): Promise<{ bookings: CustomerBooking[], pagination: any }> => {
    const response = await userSecuredApi.get<any>(`/bookings/all?page=${page}&limit=${limit}`);
    return {
      bookings: response.data?.data?.data || [],
      pagination: response.data?.data?.pagination || null,
    };
  },

  getCustomerBookingById: async (id: number): Promise<CustomerBooking> => {
    const response = await userSecuredApi.get(`/bookings/${id}`);
    
    // Extract the booking data from the response structure
    let raw = response.data?.data?.data || response.data?.data || response.data;
    if (Array.isArray(raw)) raw = raw[0];
    
    return raw;
  },

  getBookingPaymentUrl: async (bookingId: number): Promise<string> => {
    const response = await userSecuredApi.get(`/bookings/${bookingId}/payment`);
    return response.data?.data?.data?.paymentUrl || response.data?.data?.paymentUrl;
  },

  getTechnicianActiveBookings: async (page = 1, limit = 10, search?: string) => {
    let url = `/bookings/technician/active-booking?page=${page}&limit=${limit}`;
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }
    const response = await userSecuredApi.get(url);
    return response.data;
  },

  acceptBooking: async (bookingId: number) => {
    const response = await userSecuredApi.patch(`/bookings/${bookingId}/accept`);
    return response.data;
  },

  updateBookingStatus: async (bookingId: number, status: string) => {
    const response = await userSecuredApi.patch(`/bookings/${bookingId}/status`, { status });
    return response.data;
  },

  verifyBookingOtp: async (bookingId: number, otp: string) => {
    const response = await userSecuredApi.patch(`/bookings/${bookingId}/verify-otp`, { otp });
    return response.data;
  },

  resendBookingOtp: async (bookingId: number) => {
    const response = await userSecuredApi.post(`/bookings/${bookingId}/resend-otp`);
    return response.data;
  },

  createComplaint: async (payload: { serviceId?: number; bookingId?: number; title: string; description: string }) => {
    const response = await userSecuredApi.post('/bookings/complaint', payload);
    return response.data;
  },

  getAssignedBookings: async (page = 1, limit = 30, status?: string) => {
    let url = `/bookings/all?page=${page}&limit=${limit}`;
    if (status) {
      url += `&status=${status}`;
    }
    const response = await userSecuredApi.get(url);
    return response.data;
  },

  getPayments: async (page = 1, limit = 10) => {
    const response = await userSecuredApi.get(`/bookings/payments/all?page=${page}&limit=${limit}`);
    return response.data;
  },

  getComplaints: async (page = 1, limit = 10) => {
    const response = await userSecuredApi.get(`/bookings/complaints?page=${page}&limit=${limit}`);
    return response.data;
  },

  getComplaintById: async (id: number) => {
    const response = await userSecuredApi.get(`/bookings/complaint/${id}`);
    return response.data;
  },

  getPayoutStats: async () => {
    const response = await userSecuredApi.get('/bookings/technician/payout-stats');
    return response.data;
  },

  submitReview: async (payload: { bookingId: number; rating: number; review: string }) => {
    const response = await userSecuredApi.patch('/bookings/review', payload);
    return response.data;
  },
};
