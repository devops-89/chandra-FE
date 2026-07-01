import { api } from '@/api/axios';
import { ENDPOINTS } from '@/api/endpoints';
import type {
  Address,
  CreateAddressRequest,
  CreateAddressResponse,
} from '@/types/address.types';
import type {
  CustomerProfile,
  CustomerProfileResponse,
} from '@/types/customer/profile.types';

export const getCustomerProfileService = async (): Promise<CustomerProfile> => {
  const response =
    await api.get<CustomerProfileResponse>(
      ENDPOINTS.PROFILE
    );

  const outer = response.data.data;

  return outer.data;
};

export const createAddressService = async (
  payload: CreateAddressRequest
): Promise<Address> => {

  const response =
    await api.post<CreateAddressResponse>(
      ENDPOINTS.CREATE_ADDRESS,
      payload
    );

  return response.data.data.data;
};