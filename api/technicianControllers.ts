import { authSecuredApi } from './config';
import type { TechnicianProfileResponse, TechnicianUser } from '@/types/technician/profile.types';

export const TechnicianControllers = {
  getTechnicianProfile: async (): Promise<TechnicianUser> => {
    const response = await authSecuredApi.get<TechnicianProfileResponse>('/auth/profile');
    return response.data.data.data;
  },
};
