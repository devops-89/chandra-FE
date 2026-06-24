import { userServiceApi } from '@/api/axios';
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
    id: raw.id,
    name: raw.name,
    description: raw.description ?? '',
    image: raw.iconDownloadUrl ?? raw.iconUrl ?? '',
    isActive: raw.isActive ?? false,
    price: toNum(p?.serviceBasePrice),
    perHourRate: toNum(p?.perHourRate),
    perKmRate: toNum(p?.perKmRate),
    platformFee: toNum(p?.platformFee),
    gst: toNum(p?.gst),
    emergencyCharge: toNum(p?.emergencyCharge),
    status,
    bookings: raw.bookings ?? 0,
    specifications: raw.specifications,
  };
}

// ─── Fetch all services ────────────────────────────────────────────────────────

export const getAllServicesService = async (): Promise<AdminService[]> => {
  const response = await userServiceApi.get<GetAllServicesResponse>(ENDPOINTS.GET_ALL_SERVICES);
  const outer = response.data.data;

  // The backend double-wraps: response.data.data = { success, message, data: [...] }
  // Handle both double-wrapped and direct-array shapes defensively.
  let raw: ApiService[];

  if (Array.isArray(outer)) {
    raw = outer;
  } else if (
    outer &&
    typeof outer === 'object' &&
    Array.isArray((outer as { data?: ApiService[] }).data)
  ) {
    raw = (outer as { data: ApiService[] }).data;
  } else {
    raw = [];
  }

  return raw.map(normalizeService);
};

// ─── Fetch service by ID ───────────────────────────────────────────────────────

export const getServiceByIdService = async (id: number): Promise<AdminService> => {
  const response = await userServiceApi.get<GetAllServicesResponse>(
    `${ENDPOINTS.GET_SERVICE_BY_ID}/${id}`,
  );

  // Backend triple-wraps: response.data.data.data
  let raw: ApiService;

  const outer = response.data.data;

  // Try to extract the service from various response formats
  if (outer && typeof outer === 'object') {
    if (
      'data' in outer &&
      outer.data &&
      typeof outer.data === 'object' &&
      !Array.isArray(outer.data)
    ) {
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

export const createServiceService = async (payload: CreateServiceRequest): Promise<void> => {
  // Always use FormData for consistency with backend expectations
  const formData = new FormData();
  formData.append('name', payload.name);
  formData.append('description', payload.description);
  formData.append('isActive', String(payload.isActive ?? true));
  formData.append('serviceBasePrice', String(payload.serviceBasePrice));

  // Append pricing fields with defaults
  formData.append('perHourRate', String(payload.perHourRate ?? 0));
  formData.append('perKmRate', String(payload.perKmRate ?? 0));
  formData.append('platformFee', String(payload.platformFee ?? 0));
  formData.append('gst', String(payload.gst ?? 0));
  formData.append('emergencyCharge', String(payload.emergencyCharge ?? 0));
  formData.append('weekendMultiplier', String(payload.weekendMultiplier ?? 1.0));
  formData.append('peakHourMultiplier', String(payload.peakHourMultiplier ?? 1.0));
  formData.append('peakHours', JSON.stringify(payload.peakHours ?? []));
  formData.append('freeDistanceKm', String(payload.freeDistanceKm ?? 0));
  formData.append('distanceChargePerKm', String(payload.distanceChargePerKm ?? 0));
  formData.append('surgeFactor', String(payload.surgeFactor ?? 1.0));
  formData.append('isSurgeEnabled', String(payload.isSurgeEnabled ?? false));

  // Append icon if provided
  if (payload.icon) {
    formData.append('icon', payload.icon);
  }

  // Always include specifications as JSON string
  formData.append('specifications', JSON.stringify(payload.specifications || []));

  await userServiceApi.post(ENDPOINTS.CREATE_SERVICE, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// ─── Update service ────────────────────────────────────────────────────────────

export const updateServiceApiCall = async (payload: UpdateServiceRequest): Promise<void> => {
  const { id, ...body } = payload;
  await userServiceApi.patch(`${ENDPOINTS.UPDATE_SERVICE}/${id}`, body, {
    headers: { 'Content-Type': 'application/json' },
  });
};

// ─── Delete service ───────────────────────────────────────────────────────────

export const deleteServiceApiCall = async (
  id: number | string
): Promise<void> => {
  await api.delete(
    ENDPOINTS.DELETE_SERVICE(id)
  );
};