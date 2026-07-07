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
  name: string;
  phone: string;
  rating: string;
}

export interface CustomerBooking {
  bookingId: number;
  status: string;
  paymentStatus: string;

  service: BookingService | null;
  address: BookingAddress;

  scheduledAt: string;
  totalAmount: string | null;

  isEmergency: boolean;
  createdAt: string;

  technician: BookingTechnician | null;

  myRating: number | null;
  myReview: string | null;

  technicianRating: number | null;
  technicianReview: string | null;
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