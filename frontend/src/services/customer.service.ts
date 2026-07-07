import { api } from '@/api/axios';
import { ENDPOINTS } from '@/api/endpoints';
import type {
  Address,
  CreateAddressRequest,
  CreateAddressResponse, CustomerAddress, GetCustomerAddressesResponse,
  UpdateAddressRequest,
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

export const getCustomerAddressesService = async (): Promise<CustomerAddress[]> => {
  const response =
    await api.get<GetCustomerAddressesResponse>(
      ENDPOINTS.GET_CUSTOMER_ADDRESSES
    );

  return response.data.data.data;
};

export const updateAddressService = async (
  payload: UpdateAddressRequest
): Promise<Address> => {
  const { id, ...body } = payload;

  const response =
    await api.patch<CreateAddressResponse>(
      `${ENDPOINTS.UPDATE_ADDRESS}/${id}`,
      body
    );

  return response.data.data.data;
};

export const deleteAddressService = async (
  id: number
): Promise<number> => {

  await api.delete(
    `${ENDPOINTS.DELETE_ADDRESS}/${id}`
  );

  return id;
};