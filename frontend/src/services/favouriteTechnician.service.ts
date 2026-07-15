import { userServiceApi } from '@/api/axios';
import { ENDPOINTS } from '@/api/endpoints';

import type {
  FavouriteTechnician,
  GetFavouriteTechniciansResponse,
} from '@/types/customer/favouriteTechnician.types';

export const getFavouriteTechniciansService =
  async (): Promise<FavouriteTechnician[]> => {
    const response =
      await userServiceApi.get<GetFavouriteTechniciansResponse>(
        ENDPOINTS.FAVOURITE_TECHNICIANS,
      );

    return response.data.data.data;
  };