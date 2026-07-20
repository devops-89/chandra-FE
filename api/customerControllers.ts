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
import type { CustomerDashboardStats } from '@/types/customer/dashboard.types';

import { userSecuredApi } from './config';

export const CustomerControllers = {
  getCustomerProfile: async (): Promise<CustomerProfile> => {
    const response = await userSecuredApi.get<CustomerProfileResponse>('/customer/profile');
    return response.data.data;
  },

  updateCustomerProfile: async (payload: UpdateCustomerProfileRequest): Promise<CustomerProfile> => {
    const response = await userSecuredApi.patch<UpdateCustomerProfileResponse>('/customer/profile', payload);
    return response.data.data.data;
  },

  createAddress: async (payload: CreateAddressRequest): Promise<Address> => {
    const response = await userSecuredApi.post<CreateAddressResponse>('/customer/address', payload);
    return response.data.data.data;
  },

  getCustomerAddresses: async (): Promise<CustomerAddress[]> => {
    const response = await userSecuredApi.get<GetCustomerAddressesResponse>('/customer/addresses');
    return response.data.data.data;
  },

  updateAddress: async (payload: UpdateAddressRequest): Promise<Address> => {
    const { id, ...body } = payload;
    const response = await userSecuredApi.patch<CreateAddressResponse>(`/customer/address/${id}`, body);
    return response.data.data.data;
  },

  deleteAddress: async (id: number): Promise<number> => {
    await userSecuredApi.delete(`/customer/address/${id}`);
    return id;
  },

  getCustomerDashboardStats: async (): Promise<CustomerDashboardStats> => {
    const response = await userSecuredApi.get('/users/customer/dashboard-stats');
    return response.data.data.data;
  },
};
