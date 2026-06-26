import { authApi, userServiceApi } from '@/api/axios';
import { ENDPOINTS } from '@/api/endpoints';
import type {
  GenerateOtpRequest,
  GenerateOtpResponse,
  LoginRequest,
  LoginResponse,
  RegisterCustomerRequest,
  RegisterCustomerResponse,
  RegisterTechnicianRequest,
  RegisterTechnicianResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from '@/types/auth.types';

// ─── Login ────────────────────────────────────────────────────────────────────

export const loginService = async (payload: LoginRequest): Promise<LoginResponse> => {
  const response = await authApi.post<LoginResponse>(ENDPOINTS.LOGIN, payload);
  return response.data;
};

// ─── Generate OTP ─────────────────────────────────────────────────────────────

export const generateOtpService = async (
  payload: GenerateOtpRequest,
): Promise<GenerateOtpResponse> => {
  const response = await authApi.post<GenerateOtpResponse>(ENDPOINTS.GENERATE_OTP, payload);
  return response.data;
};

// ─── Verify OTP ───────────────────────────────────────────────────────────────

export const verifyOtpService = async (payload: VerifyOtpRequest): Promise<VerifyOtpResponse> => {
  const response = await authApi.post<VerifyOtpResponse>(ENDPOINTS.VERIFY_OTP, payload);
  return response.data;
};

// ─── Register Customer ────────────────────────────────────────────────────────

export const registerCustomerService = async (
  payload: RegisterCustomerRequest,
): Promise<RegisterCustomerResponse> => {
  const formData = new FormData();

  formData.append('email', payload.email);
  formData.append('username', payload.username);
  formData.append('phone', payload.phone);
  formData.append('firstName', payload.firstName);
  formData.append('lastName', payload.lastName);
  formData.append('password', payload.password);
  formData.append('customerAddress', JSON.stringify(payload.customerAddress));

  const response = await userServiceApi.post<RegisterCustomerResponse>(
    ENDPOINTS.REGISTER_CUSTOMER,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );

  return response.data;
};

// ─── Register Technician ─────────────────────────────────────────────────────

export const registerTechnicianService = async (
  payload: RegisterTechnicianRequest,
): Promise<RegisterTechnicianResponse> => {
  const formData = new FormData();

  formData.append('email',     payload.email);
  formData.append('username',  payload.username);
  formData.append('phone',     payload.phone);
  formData.append('firstName', payload.firstName);
  formData.append('lastName',  payload.lastName);
  formData.append('password',  payload.password);
  // Backend infers TECHNICIAN role from the absence of customerAddress
  formData.append('technicianProfile', JSON.stringify({}));

  const response = await userServiceApi.post<RegisterTechnicianResponse>(
    ENDPOINTS.REGISTER_TECHNICIAN,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );

  return response.data;
};
