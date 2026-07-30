import type {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  GenerateOtpRequest,
  GenerateOtpResponse,
  GetProfileResponse,
  LoginRequest,
  LoginResponse,
  RegisterCustomerRequest,
  RegisterCustomerResponse,
  RegisterTechnicianRequest,
  RegisterTechnicianResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from '@/types/auth.types';

import { authPublicApi, authSecuredApi, userPublicApi } from './config';

let getProfilePromise: Promise<GetProfileResponse> | null = null;

export const AuthControllers = {
  login: async (payload: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await authPublicApi.post<LoginResponse>('/auth/login', payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  forgotPassword: async (payload: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
    try {
      const response = await authPublicApi.post<ForgotPasswordResponse>('/auth/forgot-password', payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  resetPassword: async (payload: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
    try {
      const response = await authPublicApi.patch<ResetPasswordResponse>('/auth/reset-password', payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  generateOtp: async (payload: GenerateOtpRequest): Promise<GenerateOtpResponse> => {
    try {
      const response = await authPublicApi.post<GenerateOtpResponse>('/auth/generate-otp', payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  verifyOtp: async (payload: VerifyOtpRequest): Promise<VerifyOtpResponse> => {
    try {
      const response = await authPublicApi.post<VerifyOtpResponse>('/auth/verify-otp', payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  registerCustomer: async (payload: RegisterCustomerRequest): Promise<RegisterCustomerResponse> => {
    try {
      const formData = new FormData();
      formData.append('phone', payload.phone);
      if (payload.email) formData.append('email', payload.email);
      formData.append('username', payload.username);
      formData.append('firstName', payload.firstName);
      if (payload.lastName) formData.append('lastName', payload.lastName);
      formData.append('password', payload.password);
      formData.append('customerAddress', JSON.stringify(payload.customerAddress));

      const response = await userPublicApi.post<RegisterCustomerResponse>('/users/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  registerTechnician: async (
    payload: RegisterTechnicianRequest,
    technicianProfile: Record<string, unknown>,
    files: Record<string, Blob | string | undefined | null>
  ): Promise<RegisterTechnicianResponse> => {
    try {
      const formData = new FormData();
      if (payload.email) formData.append('email', payload.email);
      formData.append('username', payload.username);
      formData.append('phone', payload.phone);
      formData.append('firstName', payload.firstName);
      if (payload.lastName) formData.append('lastName', payload.lastName);
      formData.append('password', payload.password);
      formData.append('technicianProfile', JSON.stringify(technicianProfile));

      if (files.selfieUrl) formData.append('selfieUrl', files.selfieUrl);
      if (files.aadharUrl) formData.append('aadharUrl', files.aadharUrl);
      if (files.panUrl) formData.append('panUrl', files.panUrl);
      if (files.policeCertUrl) formData.append('policeCertUrl', files.policeCertUrl);
      if (files.tradeLicenseUrl) formData.append('tradeLicenseUrl', files.tradeLicenseUrl);

      const response = await userPublicApi.post<RegisterTechnicianResponse>('/users/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getProfile: async (): Promise<GetProfileResponse> => {
    if (getProfilePromise) return getProfilePromise;
    getProfilePromise = (async () => {
      try {
        const response = await authSecuredApi.get<GetProfileResponse>('/auth/profile');
        return response.data;
      } finally {
        getProfilePromise = null;
      }
    })();
    return getProfilePromise;
  },

  logout: async (): Promise<{ success: boolean; message: string }> => {
    try {
      const refreshToken =
        (typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null) || '';

      const response = await authSecuredApi.post('/auth/logout', { refreshToken });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
