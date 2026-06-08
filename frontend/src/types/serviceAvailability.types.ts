export interface AvailabilityFormData {
  fullName: string;
  phone: string;
  pincode: string;
}

export type AvailabilityStatus = 'idle' | 'available' | 'unavailable';
