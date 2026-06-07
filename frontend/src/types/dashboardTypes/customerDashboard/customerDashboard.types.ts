export type BookingProgressStatus =
  | "booked"
  | "assigned"
  | "on-way"
  | "started"
  | "completed";

export interface BookingTechnician {
  id: string;
  name: string;
  avatar: string;
  eta: string;
}

export interface ActiveBooking {
  id: string;
  serviceName: string;
  bookingDate: string;
  bookingTime: string;
  technician: BookingTechnician;
  status: BookingProgressStatus;
}

export interface RecentBooking {
  id: string;
  serviceName: string;
  bookingDate: string;
  status: string;
}

export interface Invoice {
  id: string;
  amount: number;
  invoiceDate: string;
  status: "Paid" | "Pending";
  pdfUrl: string;
  serviceName?: string;
}

export interface FavoriteTechnician {
  id: string;
  name: string;
  rating: number;
  avatar: string;
  specialization?: string;
}

export interface Review {
  id: string;
  serviceName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface RebookService {
  id: string;
  serviceName: string;
  icon: "kitchen" | "pest_control";
}
