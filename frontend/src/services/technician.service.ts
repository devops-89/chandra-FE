import { authApi } from '@/api/axios';
import { ENDPOINTS } from '@/api/endpoints';
import type { TechnicianProfileResponse,TechnicianUser,  } from '@/types/technician/profile.types';


export const getTechnicianProfileService =
async (): Promise<TechnicianUser> => {

  const response =
    await authApi.get<TechnicianProfileResponse>(
      ENDPOINTS.PROFILE
    );

  return response.data.data.data;
};