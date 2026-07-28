export interface UnifiedBookingPageProps {
  service:     string;       // legacy slug (backward compat)
  serviceId?:  number;       // preferred — numeric ID from /booking?serviceId=N
  summaryPath?: string;      // where "Confirm" navigates. Default: '/booking/summary'
  variant?: 'public' | 'dashboard';
}

export interface TimeSlots {
  morning: string[];
  afternoon: string[];
  evening: string[];
}

export interface BookingFormData {
  name: string;
  phone: string;
  instructions: string;
  selectedAddress: 'home' | 'office' | 'new';
  newAddress: string;
  date: string;
  slot: string;
}

export interface BookingStep {
  id: number;
  label: string;
  completed: boolean;
}

export interface AddressOption {
  id: 'home' | 'office' | 'new';
  label: string;
  address: string;
  icon: React.ComponentType;
}
