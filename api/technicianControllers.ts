import type { TechnicianProfileResponse, TechnicianUser } from '@/types/technician/profile.types';

import { authSecuredApi, userSecuredApi } from './config';

export const TechnicianControllers = {
  getTechnicianProfile: async (): Promise<TechnicianUser> => {
    const response = await authSecuredApi.get<TechnicianProfileResponse>('/auth/profile');
    return response.data.data;
  },
  updateTechnicianProfile: async (payload: Partial<TechnicianUser>): Promise<TechnicianUser> => {
    const response = await userSecuredApi.patch<TechnicianProfileResponse>('/users/profile', payload);
    return response.data.data;
  },
  updateTechnicianProfileWithFiles: async (formData: FormData): Promise<TechnicianUser> => {
    const response = await userSecuredApi.patch<TechnicianProfileResponse>('/users/profile', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data;
  },
  updateBrandExpertise: async (brands: string[]): Promise<any> => {
    const response = await userSecuredApi.patch('/users/technician/brand-expertise', { brands });
    return response.data;
  },
  updateTechnicianLocation: async (locationId: number, payload: any): Promise<any> => {
    const response = await userSecuredApi.patch(`/users/technician/location/${locationId}`, payload);
    return response.data;
  },
  addTechnicianLocation: async (payload: any): Promise<any> => {
    const response = await userSecuredApi.post('/users/technician/location', payload);
    return response.data;
  },
  deleteTechnicianLocation: async (locationId: number): Promise<any> => {
    const response = await userSecuredApi.delete(`/users/technician/location/${locationId}`);
    return response.data;
  },
  updateTechnicianServices: async (services: number[]): Promise<any> => {
    const response = await userSecuredApi.patch('/users/technician/services', { services });
    return response.data;
  },
  addPayoutAccount: async (payload: any): Promise<any> => {
    const response = await userSecuredApi.post('/users/technician/payout-account', payload);
    return response.data;
  },
  updatePayoutAccount: async (accountId: number, payload: any): Promise<any> => {
    const response = await userSecuredApi.patch(`/users/technician/payout-account/${accountId}`, payload);
    return response.data;
  },
  deletePayoutAccount: async (accountId: number): Promise<any> => {
    const response = await userSecuredApi.delete(`/users/technician/payout-account/${accountId}`);
    return response.data;
  }
};
