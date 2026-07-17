import type { FavouriteTechnician, GetFavouriteTechniciansResponse } from '@/types/customer/favouriteTechnician.types';

import { userSecuredApi } from './config';

export const FavouriteTechnicianControllers = {
  getFavouriteTechnicians: async (): Promise<FavouriteTechnician[]> => {
    const response = await userSecuredApi.get<GetFavouriteTechniciansResponse>('/users/favourite-technicians');
    return response.data.data.data;
  },
};
