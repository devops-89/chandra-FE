import type { BOOKING_PAYMENT_STATUS,BOOKING_STATUS } from '../enums';

export interface BookingService {
  id: number;
  name: string;
}

export interface BookingAddress {
  fullAddress: string;
  city: string;
  state: string;
  pincode: string;
}

export interface BookingCustomer {
  id: number;
  name?: string;
  firstName?: string;
  lastName?: string;
  phone: string;
}

export interface BookingTechnician {
  id: number;
  name?: string;
  firstName?: string;
  lastName?: string;
  phone: string;
}

export interface AdminBooking {
  id?: number;
  bookingId?: number;

  status: BOOKING_STATUS;

  paymentStatus: BOOKING_PAYMENT_STATUS;

  service: BookingService | null;

  address: BookingAddress;

  scheduledAt: string;

  scheduledAtIst: string;

  totalAmount: string | null;

  isEmergency: boolean;

  createdAt: string;

  createdAtIst: string;

  customer: BookingCustomer;

  technician: BookingTechnician | null;

  customerRating?: number | null;
  customerReview?: string | null;
  technicianRating?: number | null;
  technicianReview?: string | null;
  reviewStatus?: string;
}

export interface BookingPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetAdminBookingsResponse {
  success: boolean;

  statusCode: number;

  message: string;

  data: {
    success: boolean;

    message: string;

    data: AdminBooking[];

    pagination: BookingPagination;
  };
}