export interface CreateAddressRequest {
  latitude: number;
  longitude: number;
  fullAddress: string;
  city: string;
  state: string;
  pincode: string;
  label: string;
  isDefault: boolean;
}

export interface Address {
  id: number;
  userId: number;
  latitude: number;
  longitude: number;
  fullAddress: string;
  city: string;
  state: string;
  pincode: string;
  label: string;
  isDefault: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAddressResponse {
  success: boolean;
  statusCode: number;
  message: string;

  data: {
    success: boolean;
    message: string;
    data: Address;
  };
}

export interface UpdateAddressRequest {
  id: number;

  latitude: number;
  longitude: number;

  fullAddress: string;
  city: string;
  state: string;
  pincode: string;

  label: string;
}

export interface CustomerAddress {
  id: number;
  fullAddress: string;
  city: string;
  state: string;
  pincode: string;
  latitude: number;
  longitude: number;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetCustomerAddressesResponse {
  success: boolean;
  statusCode: number;
  message: string;

  data: {
    success: boolean;
    message: string;
    data: CustomerAddress[];
    pagination?: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}