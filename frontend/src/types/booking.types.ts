export interface BookingFormProps {
  service: string;
}

export interface ServiceSpecification {
  specificationId: number;
  value: string | number;
}

export interface CreateBookingRequest {
  serviceId: number;
  customerAddressId: number;
  isEmergency: boolean;
  scheduledAt: string;
  serviceSpecifications: ServiceSpecification[];
}

export interface Booking {
  id: number;
  serviceId: number;
  customerAddressId: number;
  technicianId: number | null;
  status: string;
  scheduledAtIst: string;
  isEmergency: boolean;
  createdAt: string;
}

export interface CreateBookingResponse {
  success: boolean;
  statusCode: number;
  message: string;

  data: {
    success: boolean;
    message: string;
    data: Booking;
  };
}

export interface RescheduleBookingRequest {
  scheduledAt: string;
}

export interface RescheduleBookingResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    message: string;
    data: Booking;
  };
}