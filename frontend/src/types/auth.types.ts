// ─── Form Data ───────────────────────────────────────────────────────────────

export interface SignupFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

export interface SignupErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  termsAccepted?: string;
}

export type SignupFieldsProps = {
  form: SignupFormData;
  errors: SignupErrors;
  onChange: (name: keyof SignupFormData, value: string) => void;
};

// ─── Auth entities ────────────────────────────────────────────────────────────

export interface User {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
}

// ─── Login ────────────────────────────────────────────────────────────────────

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    message: string;
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
    user: User;
  };
}

// ─── Generate OTP ─────────────────────────────────────────────────────────────

export interface GenerateOtpRequest {
  email: string;
  phone: string;
  role: 'CUSTOMER';
}

export interface GenerateOtpResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: {
    message?: string;
  };
}

// ─── Verify OTP ───────────────────────────────────────────────────────────────

export interface VerifyOtpRequest {
  email: string;
  phone: string;
  otp: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: {
    message?: string;
  };
}

// ─── Customer Address (required by registration) ─────────────────────────────

export interface CustomerAddress {
  latitude: number;
  longitude: number;
  fullAddress: string;
  city: string;
  state: string;
  pincode: string;
  label: 'Home' | 'Work' | 'Other';
}

// ─── Register Customer ────────────────────────────────────────────────────────

/** Sent as multipart/form-data */
export interface RegisterCustomerRequest {
  email: string;
  username: string;
  phone: string;
  firstName: string;
  lastName: string;
  password: string;
  customerAddress: CustomerAddress;
}

export interface RegisterCustomerResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    message: string;
    user: User;
  };
}

// ─── Legacy — kept for backward compat ───────────────────────────────────────

/** @deprecated use RegisterCustomerRequest */
export type SignupRequest = RegisterCustomerRequest;
/** @deprecated use RegisterCustomerResponse */
export type SignupResponse = RegisterCustomerResponse;
