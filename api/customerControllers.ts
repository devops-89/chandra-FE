import type {
  Address,
  CreateAddressRequest,
  CreateAddressResponse,
  CustomerAddress,
  GetCustomerAddressesResponse,
  UpdateAddressRequest,
} from '@/types/address.types';
import type {
  CustomerProfile,
  CustomerProfileResponse,
  UpdateCustomerProfileRequest,
  UpdateCustomerProfileResponse,
} from '@/types/customer/profile.types';

import { userSecuredApi } from './config';

export const CustomerControllers = {
  getCustomerProfile: async (): Promise<CustomerProfile> => {
    const response = await userSecuredApi.get<CustomerProfileResponse>('/auth/profile');
    return response.data.data;
  },

  updateCustomerProfile: async (payload: UpdateCustomerProfileRequest): Promise<CustomerProfile> => {
    const response = await userSecuredApi.patch<UpdateCustomerProfileResponse>('/auth/profile', payload);
    return response.data.data.data;
  },

  createAddress: async (payload: CreateAddressRequest): Promise<Address> => {
    const response = await userSecuredApi.post<CreateAddressResponse>('/users/customer/address', payload);
    return response.data.data.data;
  },

  getCustomerAddresses: async (): Promise<CustomerAddress[]> => {
    const response = await userSecuredApi.get<GetCustomerAddressesResponse>('/users/customer/addresses');
    return response.data.data.data;
  },

  updateAddress: async (payload: UpdateAddressRequest): Promise<Address> => {
    const { id, ...body } = payload;
    const response = await userSecuredApi.patch<CreateAddressResponse>(`/users/customer/address/${id}`, body);
    return response.data.data.data;
  },

  deleteAddress: async (id: number): Promise<number> => {
    await userSecuredApi.delete(`/users/customer/address/${id}`);
    return id;
  },

  getCustomerDashboardStats: async (): Promise<unknown> => {
    const response = await userSecuredApi.get('/users/customer/dashboard-stats');
    return response.data.data.data;
  },
};
