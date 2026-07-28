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
    type: 'text' | 'number' | 'select' | 'image';
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
    type: 'text' | 'number' | 'select' | 'image';
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
  totalBookings?: number;
  pendingBookings?: number;
  acceptedBookings?: number;
  cancelledBookings?: number;
  completedBookings?: number;
  createdAt?: string;
  updatedAt?: string;
  specifications?: {
    id: number;
    name: string;
    type: 'text' | 'number' | 'select' | 'image';
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
  isServiceBasePriceApplied?: boolean;
  
  perHourRate?: number;
  perKmRate?: number;
  emergencyCharge?: number;

  platformFee?: number;
  isPlatformFeeApplied?: boolean;
  
  gst?: number;
  isGstApplied?: boolean;

  isDistanceKmApplied?: boolean;
  isWeekendApplied?: boolean;
  isPeakHourApplied?: boolean;
  isEmergencyApplied?: boolean;
  isPerHourRateApplied?: boolean;
  isSurgeEnabled?: boolean;

  specifications?: {
    name: string;
    type: 'text' | 'number' | 'select' | 'image';
    isRequired: boolean;
    isActive: boolean;
    values?: string[];
  }[];
}

export interface CreateServiceRequest {
  name: string;
  description: string;
  icon?: File | null;
  isActive?: boolean;
  specifications?: {
    name: string;
    type: 'text' | 'number' | 'select' | 'image';
    isRequired: boolean;
    values?: string[];
  }[];

  serviceBasePrice: number;
  isServiceBasePriceApplied?: boolean;
  platformFee?: number;
  isPlatformFeeApplied?: boolean;
  gst?: number;
  isGstApplied?: boolean;
  weekendMultiplier?: number;
  peakHourMultiplier?: number;
  peakHours?: { start: number; end: number }[];
  freeDistanceKm?: number;
  distanceChargePerKm?: number;
  surgeFactor?: number;
  isSurgeEnabled?: boolean;
  isDistanceKmApplied?: boolean;
  isWeekendApplied?: boolean;
  isPeakHourApplied?: boolean;
  isEmergencyApplied?: boolean;
  isPerHourRateApplied?: boolean;
}

