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

export interface CustomerProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phone: string;
  isTokenPaid?: boolean;
  emergencyContact: string | null;
  profileImage: string | null;
  role: string;
  status: string;
  createdAt: string;
  lastLoginAt: string;
  addresses: Address[];
}

export interface CustomerProfileResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: CustomerProfile;
}

export interface UpdateCustomerProfileRequest {
  firstName: string;
  lastName: string;
  phone: string;
  emergencyContact?: string | null;
}

export interface UpdateCustomerProfileResponse {
  success: boolean;
  statusCode: number;
  message: string;

  data: {
    success: boolean;
    message: string;
    data: CustomerProfile;
  };
}
