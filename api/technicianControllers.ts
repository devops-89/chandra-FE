import type { TechnicianProfileResponse, TechnicianUser } from '@/types/technician/profile.types';

import { authSecuredApi, userSecuredApi } from './config';

export const TechnicianControllers = {
  getTechnicianProfile: async (): Promise<TechnicianUser> => {
    const response = await authSecuredApi.get<TechnicianProfileResponse>('/auth/profile');
    return response.data.data.data;
  },
  updateTechnicianProfile: async (payload: Partial<TechnicianUser>): Promise<TechnicianUser> => {
    const response = await userSecuredApi.patch<TechnicianProfileResponse>('/users/profile', payload);
    return response.data.data.data;
  },
  updateTechnicianProfileWithFiles: async (formData: FormData): Promise<TechnicianUser> => {
    const response = await userSecuredApi.patch<TechnicianProfileResponse>('/users/profile', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data.data;
  }
};
