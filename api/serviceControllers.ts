import { userSecuredApi } from './config';
import type {
  AdminService,
  ApiService,
  CreateServiceRequest,
  GetAllServicesResponse,
  ServiceStatus,
  UpdateServiceRequest,
} from '@/types/admin/service.types';

function normalizeService(raw: ApiService): AdminService {
  const status: ServiceStatus = raw.isActive ? 'Active' : 'Inactive';
  const p = raw.pricingRule;
  const toNum = (v?: string | number) => (v != null ? parseFloat(String(v)) : 0);

  const getSafeImage = (url: string | null | undefined) => {
    if (!url || url === 'null' || url === 'undefined') return '';
    return url;
  };

  return {
    id: raw.id,
    name: raw.name,
    description: raw.description ?? '',
    image: getSafeImage(raw.iconDownloadUrl) || getSafeImage(raw.iconUrl) || '',
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

export const ServiceControllers = {
  getAllServices: async (): Promise<AdminService[]> => {
    const response = await userSecuredApi.get<GetAllServicesResponse>('/users/service/all');
    const outer = response.data.data;
    let raw: ApiService[];

    if (Array.isArray(outer)) {
      raw = outer;
    } else if (outer && typeof outer === 'object' && Array.isArray((outer as { data?: ApiService[] }).data)) {
      raw = (outer as { data: ApiService[] }).data;
    } else {
      raw = [];
    }

    return raw.map(normalizeService);
  },

  getServiceById: async (id: number): Promise<AdminService> => {
    const response = await userSecuredApi.get<GetAllServicesResponse>(`/users/service/${id}`);
    let raw: ApiService;
    const outer = response.data.data;

    if (outer && typeof outer === 'object') {
      if ('data' in outer && outer.data && typeof outer.data === 'object' && !Array.isArray(outer.data)) {
        raw = outer.data as ApiService;
      } else if ('id' in outer && 'name' in outer) {
        raw = outer as unknown as ApiService;
      } else {
        throw new Error('Invalid response format');
      }
    } else {
      throw new Error('Invalid response format');
    }

    return normalizeService(raw);
  },

  createService: async (payload: CreateServiceRequest): Promise<void> => {
    const formData = new FormData();
    formData.append('name', payload.name);
    formData.append('description', payload.description);
    formData.append('isActive', String(payload.isActive ?? true));
    formData.append('serviceBasePrice', String(payload.serviceBasePrice));

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

    if (payload.icon) formData.append('icon', payload.icon);
    formData.append('specifications', JSON.stringify(payload.specifications || []));

    await userSecuredApi.post('/users/admin/service', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  updateService: async (payload: UpdateServiceRequest): Promise<void> => {
    const { id, ...body } = payload;
    await userSecuredApi.patch(`/users/update/service/${id}`, body, {
      headers: { 'Content-Type': 'application/json' },
    });
  },

  deleteService: async (id: number | string): Promise<void> => {
    await userSecuredApi.delete(`/users/delete/service/${id}`);
  },
};
