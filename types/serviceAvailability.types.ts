export interface AvailabilityFormData {
  fullName: string;
  phone: string;
  pincode: string;
}

export type AvailabilityStatus = 'idle' | 'available' | 'unavailable';

export interface AvailabilityContent {
  title: string;
  description?: string;
  placeholder?: string;
  image?: string;
}
