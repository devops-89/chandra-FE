import { api } from '@/api/axios';
import { ENDPOINTS } from '@/api/endpoints';
import type {
  AdminService,
  ApiService,
  CreateServiceRequest,
  GetAllServicesResponse,
  ServiceStatus,
  UpdateServiceRequest,
} from '@/types/admin/service.types';

// ─── Normalizer ────────────────────────────────────────────────────────────────

/**
 * Maps the raw API shape to AdminService used throughout the UI.
 * Pricing lives inside raw.pricingRule; image field is iconUrl.
 */
function normalizeService(raw: ApiService): AdminService {
  const status: ServiceStatus = raw.isActive ? 'Active' : 'Inactive';

  const p = raw.pricingRule;
  const toNum = (v?: string | number) => (v != null ? parseFloat(String(v)) : 0);

  return {
    id:              raw.id,
    name:            raw.name,
    description:     raw.description ?? '',
    image:           raw.iconUrl ?? '',
    isActive:        raw.isActive ?? false,
    price:           toNum(p?.serviceBasePrice),
    perHourRate:     toNum(p?.perHourRate),
    perKmRate:       toNum(p?.perKmRate),
    platformFee:     toNum(p?.platformFee),
    gst:             toNum(p?.gst),
    emergencyCharge: toNum(p?.emergencyCharge),
    status,
    bookings:        raw.bookings ?? 0,
  };
}

// ─── Fetch all services ────────────────────────────────────────────────────────

export const getAllServicesService = async (): Promise<AdminService[]> => {
  const response = await api.get<GetAllServicesResponse>(ENDPOINTS.GET_ALL_SERVICES);
  const outer = response.data.data;

  // The backend double-wraps: response.data.data = { success, message, data: [...] }
  // Handle both double-wrapped and direct-array shapes defensively.
  let raw: ApiService[];

  if (Array.isArray(outer)) {
    raw = outer;
  } else if (outer && typeof outer === 'object' && Array.isArray((outer as { data?: ApiService[] }).data)) {
    raw = (outer as { data: ApiService[] }).data;
  } else {
    raw = [];
  }

  return raw.map(normalizeService);
};

// ─── Fetch service by ID ───────────────────────────────────────────────────────

export const getServiceByIdService = async (id: number): Promise<AdminService> => {
  const response = await api.get<GetAllServicesResponse>(`${ENDPOINTS.GET_SERVICE_BY_ID}/${id}`);
  
  // Backend triple-wraps: response.data.data.data
  let raw: ApiService;
  
  const outer = response.data.data;
  
  // Try to extract the service from various response formats
  if (outer && typeof outer === 'object') {
    if ('data' in outer && outer.data && typeof outer.data === 'object' && !Array.isArray(outer.data)) {
      // Triple-wrapped: response.data.data.data
      raw = outer.data as ApiService;
    } else if ('id' in outer && 'name' in outer) {
      // Double-wrapped: response.data.data (direct service)
      raw = outer as unknown as ApiService;
    } else {
      throw new Error('Invalid response format');
    }
  } else {
    throw new Error('Invalid response format');
  }

  return normalizeService(raw);
};

// ─── Create service ────────────────────────────────────────────────────────────

export const createServiceService = async (
  payload: CreateServiceRequest
): Promise<void> => {

  // If an icon file is provided, use multipart; otherwise use JSON.
  // The backend returns iconUrl: null for all services, so file upload is optional.
  if (payload.icon) {
    const formData = new FormData();
    formData.append('name',             payload.name);
    formData.append('description',      payload.description);
    formData.append('isActive',         payload.isActive ? 'true' : 'false');
    formData.append('icon',             payload.icon);
    formData.append('serviceBasePrice', String(payload.serviceBasePrice));
    if (payload.perHourRate     != null) formData.append('perHourRate',     String(payload.perHourRate));
    if (payload.perKmRate       != null) formData.append('perKmRate',       String(payload.perKmRate));
    if (payload.platformFee     != null) formData.append('platformFee',     String(payload.platformFee));
    if (payload.gst             != null) formData.append('gst',             String(payload.gst));
    if (payload.emergencyCharge != null) formData.append('emergencyCharge', String(payload.emergencyCharge));

    await api.post(ENDPOINTS.CREATE_SERVICE, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return;
  }

  const body: Record<string, unknown> = {
    name:             payload.name,
    description:      payload.description,
    isActive:         payload.isActive,
    serviceBasePrice: payload.serviceBasePrice,
    ...(payload.perHourRate     != null && { perHourRate:     payload.perHourRate }),
    ...(payload.perKmRate       != null && { perKmRate:       payload.perKmRate }),
    ...(payload.platformFee     != null && { platformFee:     payload.platformFee }),
    ...(payload.gst             != null && { gst:             payload.gst }),
    ...(payload.emergencyCharge != null && { emergencyCharge: payload.emergencyCharge }),
  };

  await api.post(ENDPOINTS.CREATE_SERVICE, body, {
    headers: { 'Content-Type': 'application/json' },
  });
};

// ─── Update service ────────────────────────────────────────────────────────────

export const updateServiceApiCall = async (
  payload: UpdateServiceRequest
): Promise<void> => {
  const { id, ...body } = payload;
  await api.patch(
    `${ENDPOINTS.UPDATE_SERVICE}/${id}`,
    body,
    { headers: { 'Content-Type': 'application/json' } }
  );
};

// ─── Delete service ───────────────────────────────────────────────────────────

export const deleteServiceApiCall = async (
  id: number | string
): Promise<void> => {
  await api.delete(
    ENDPOINTS.DELETE_SERVICE(id)
  );
};