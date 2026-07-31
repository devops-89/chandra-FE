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

import { authSecuredApi, userSecuredApi } from './config';

export const CustomerControllers = {
  getCustomerProfile: async (): Promise<CustomerProfile> => {
    const response = await authSecuredApi.get<CustomerProfileResponse>('/auth/profile');
    return response.data.data;
  },

  updateCustomerProfile: async (payload: UpdateCustomerProfileRequest): Promise<CustomerProfile> => {
    const response = await userSecuredApi.patch<UpdateCustomerProfileResponse>('/users/profile', payload);
    return response.data.data.data;
  },

  updateCustomerProfileWithFiles: async (payload: FormData): Promise<CustomerProfile> => {
    const response = await userSecuredApi.patch<UpdateCustomerProfileResponse>('/users/profile', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data.data;
  },

  createAddress: async (payload: CreateAddressRequest): Promise<Address> => {
    const response = await userSecuredApi.post<CreateAddressResponse>('/users/customer/address', payload);
    return response.data.data.data;
  },

  getCustomerAddresses: async (params?: { page: number; limit: number }): Promise<{ data: CustomerAddress[], pagination?: any }> => {
    const response = await userSecuredApi.get<GetCustomerAddressesResponse>('/users/customer/addresses', { params });
    return {
      data: response.data.data.data,
      pagination: response.data.data.pagination
    };
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

  getCustomerDashboardStats: async (): Promise<CustomerDashboardStats> => {
    const response = await userSecuredApi.get('/users/customer/dashboard-stats');
    return response.data.data.data;
  },
};
