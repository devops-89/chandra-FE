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

export interface BookingTechnician {
  id: number;
  name?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  phone: string;
  rating?: string;
}

export interface CustomerBooking {
  bookingId?: number; // legacy
  id?: number;
  status: string;
  paymentStatus?: string;
  bookingPaymentStatus?: string;

  service: BookingService | null;
  address: BookingAddress;

  scheduledAtIst?: string;
  scheduledAt?: string;
  totalAmount: string | null;

  isEmergency: boolean;
  createdAt: string;

  technician: BookingTechnician | null;

  myRating: number | null;
  myReview: string | null;

  technicianRating: number | null;
  technicianReview: string | null;

  cancelledBy?: number;
  cancelledByRole?: string;
  cancellationReason?: string;
  updatedAt?: string;
}

export interface BookingPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CustomerBookingsResponse {
  success: boolean;
  statusCode: number;
  message: string;

  data: {
    success: boolean;
    message: string;

    data: CustomerBooking[];

    pagination: BookingPagination;
  };
}

export interface CancelBookingRequest {
  bookingId: number;
  cancellationReason: string;
}

export interface CancelBookingResponse {
  success: boolean;
  statusCode: number;
  message: string;

  data: {
    message: string;
    data: CancelledBooking;
  };
}

export interface CancelledBooking {
  bookingId: number;
  status: string;
  cancelledBy: number;
  cancelledByRole: string;
  cancellationReason: string;
  updatedAt: string;
}