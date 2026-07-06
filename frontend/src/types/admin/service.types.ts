export type ServiceStatus = 'Active' | 'Inactive';

export interface AdminService {
  id: number;
  image: string;
  name: string;
  description: string;
  isActive: boolean;
  price: number;   // serviceBasePrice — used for display in table
  perHourRate: number;
  perKmRate: number;
  platformFee: number;
  gst: number;
  emergencyCharge: number;
  status: ServiceStatus;
  bookings: number;
  specifications?: {
    id: number;
    name: string;
    type: 'text' | 'number' | 'textarea' | 'select' | 'image';
    isRequired: boolean;
    values?: string[];
  }[];
}

/** Shape of the edit form's controlled state — maps to UpdateServiceRequest */
export interface EditServiceFormData {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  serviceBasePrice: string;
  perHourRate: string;
  perKmRate: string;
  platformFee: string;
  gst: string;
  emergencyCharge: string;
  specifications?: {
    name: string;
    type: 'text' | 'number' | 'textarea' | 'select' | 'image';
    isRequired: boolean;
    values?: string[];
  }[];
}

export interface Subcategory {
  id: number;
  name: string;
  categoryId: number;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  subcategories: string[];
}

// ─── API Response ─────────────────────────────────────────────────────────────

/** Pricing rule as returned by the backend */
export interface ApiPricingRule {
  id?: number;
  serviceId?: number;
  serviceBasePrice?: string | number;
  perHourRate?: string | number;
  perKmRate?: string | number;
  platformFee?: string | number;
  gst?: string | number;
  emergencyCharge?: string | number;
  weekendMultiplier?: string | number;
  peakHourMultiplier?: string | number;
  surgeFactor?: string | number;
  isSurgeEnabled?: boolean;
  freeDistanceKm?: number;
  distanceChargePerKm?: string | number;
  peakHours?: unknown[];
}

/**
 * Single service item as returned by GET /users/service/all.
 * Pricing lives inside a nested `pricingRule` object.
 */
export interface ApiService {
  id: number;
  name: string;
  description?: string;
  iconUrl?: string | null;
  iconDownloadUrl?: string | null;
  isActive?: boolean;
  pricingRule?: ApiPricingRule;
  category?: string;
  subcategory?: string;
  duration?: string;
  bookings?: number;
  createdAt?: string;
  updatedAt?: string;
  specifications?: {
    id: number;
    name: string;
    type: 'text' | 'number' | 'textarea' | 'select' | 'image';
    isRequired: boolean;
    values?: string[];
  }[];
}

/** Inner envelope — backend double-wraps the array */
interface GetAllServicesInner {
  success?: boolean;
  message?: string;
  data: ApiService[];
}

export interface GetAllServicesResponse {
  success: boolean;
  statusCode?: number;
  message: string;
  data: GetAllServicesInner | ApiService[] | null;
}

// ─── Update Service Request ───────────────────────────────────────────────────

/** Sent as JSON to PATCH /users/admin/service/:id */
export interface UpdateServiceRequest {
  id: number;

  name: string;
  description: string;
  isActive: boolean;

  serviceBasePrice: number;

  perHourRate?: number;
  perKmRate?: number;
  platformFee?: number;
  gst?: number;
  emergencyCharge?: number;
}

export interface CreateServiceRequest {
  name: string;
  description: string;
  icon?: File | null;
  isActive?: boolean;
  specifications?: {
    name: string;
    type: 'text' | 'number' | 'textarea' | 'select' | 'image';
    isRequired: boolean;
    values?: string[];
  }[];

  serviceBasePrice: number;
  perHourRate?: number;
  perKmRate?: number;
  platformFee?: number;
  gst?: number;
  emergencyCharge?: number;
  weekendMultiplier?: number;
  peakHourMultiplier?: number;
  peakHours?: { start: number; end: number }[];
  freeDistanceKm?: number;
  distanceChargePerKm?: number;
  surgeFactor?: number;
  isSurgeEnabled?: boolean;
}

