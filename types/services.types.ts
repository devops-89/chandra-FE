export interface BookingFormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'tel' | 'select' | 'checkbox' | 'file' | 'multi-file';
  required: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string; price?: number }>;
  min?: number;
  max?: number;
  accept?: string; // For file inputs (e.g., 'image/*', '.pdf,.doc,.docx')
  multiple?: boolean; // For multi-file inputs
  maxFiles?: number; // Maximum number of files for multi-file
  validation?: {
    pattern?: string;
    message?: string;
  };
  conditional?: {
    dependsOn: string; // Field name this field depends on
    values: string[]; // Show this field only when dependsOn field has these values
  };
  priceCalculation?: {
    basePrice?: number;
    multiplier?: string; // Field name to multiply with
    formula?: string; // Custom calculation formula
  };
}

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  badge: string;
  price: number;
  gridSize: {
    md: number;
  };
  overview: string;
  includes: string[];
  ctaTitle: string;
  ctaDescription: string;
  bookingForm: BookingFormField[];
  formConfig?: {
    showPriceSummary?: boolean;
    pricingEngine?: string; // 'solar' | 'ac' | 'fixed'
    summaryFields?: string[]; // Fields to highlight in summary
  };
}

export interface ServiceImageProps {
  src: string;
  alt: string;
  alignRight?: boolean;
}

export interface ServiceCardProps {
  service: Service;
  alignRight?: boolean;
}

export interface DynamicBookingFormProps {
  fields: BookingFormField[];
  service: Service; // Pass full service object instead of just slug
  onSubmit: (data: BookingFormData) => void;
  isLoading?: boolean;
}

export interface BookingFormData {
  [key: string]: string | number | boolean | File | File[];
}

export type Props = {
  service: string;
  date: string;
  time: string;
  status: string;
};

export interface EditServiceForm {
  open: boolean;
  onClose: () => void;
  category: {
    id: number;
    name: string;
    services: number;
  } | null;
  onSave: (category: {
    id: number;
    name: string;
    services: number;
  }) => void;
}