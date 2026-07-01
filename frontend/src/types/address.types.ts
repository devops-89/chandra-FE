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