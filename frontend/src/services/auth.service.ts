import { authApi, userServiceApi } from '@/api/axios';
import { ENDPOINTS } from '@/api/endpoints';
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

// ─── Login ────────────────────────────────────────────────────────────────────

export const loginService = async (payload: LoginRequest): Promise<LoginResponse> => {
  const response = await authApi.post<LoginResponse>(ENDPOINTS.LOGIN, payload);
  return response.data;
};

// ─── Forgot Password ───────────────────────────────────────────────

export const forgotPasswordService = async (
  payload: ForgotPasswordRequest,
): Promise<ForgotPasswordResponse> => {
  const response = await authApi.post<ForgotPasswordResponse>(
    ENDPOINTS.FORGOT_PASSWORD,
    payload,
  );

  return response.data;
};

// ─── Reset Password ───────────────────────────────────────────────

export const resetPasswordService = async (
  payload: ResetPasswordRequest,
): Promise<ResetPasswordResponse> => {
  const response = await authApi.patch<ResetPasswordResponse>(
    ENDPOINTS.RESET_PASSWORD,
    payload,
  );

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

  formData.append('phone', payload.phone);
  if (payload.email) {
    formData.append('email', payload.email);
  }
  formData.append('username', payload.username);
  formData.append('firstName', payload.firstName);
  if (payload.lastName) {
    formData.append('lastName', payload.lastName);
  }
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
  technicianProfile: {
    yearsOfExperience: number;
    languages: string[];
    services: { serviceId: number }[];
    brandExpertise: { brandName: string }[];
    hasLadder: boolean;
    hasACGauges: boolean;
    hasSafetyEquipment: boolean;
    hasVehicle: boolean;
    serviceRadiusKm: number;
    // UPI payout
    upiId?: string;
    // Bank transfer payout
    accountHolderName?: string;
    accountNumber?: string;
    ifscCode?: string;
    bankName?: string;
    // GST (optional)
    gst?: string;
    // Location (always included when available)
    address?: string;
    latitude?: number;
    longitude?: number;
    city?: string;
    state?: string;
    pincode?: string;
  },
  files: {
    aadharUrl?: File | null;
    panUrl?: File | null;
    policeCertUrl?: File | null;
    tradeLicenseUrl?: File | null;
    selfieUrl?: File | null;
  }
): Promise<RegisterTechnicianResponse> => {
  const formData = new FormData();

  if (payload.email) {
    formData.append('email', payload.email);
  }
  formData.append('username',  payload.username);
  formData.append('phone',     payload.phone);
  formData.append('firstName', payload.firstName);
  if (payload.lastName) {
    formData.append('lastName', payload.lastName);
  }
  formData.append('password',  payload.password);
  formData.append('technicianProfile', JSON.stringify(technicianProfile));

  if (files.selfieUrl) formData.append('selfieUrl', files.selfieUrl);
  if (files.aadharUrl) formData.append('aadharUrl', files.aadharUrl);
  if (files.panUrl) formData.append('panUrl', files.panUrl);
  if (files.policeCertUrl) formData.append('policeCertUrl', files.policeCertUrl);
  if (files.tradeLicenseUrl) formData.append('tradeLicenseUrl', files.tradeLicenseUrl);

  const response = await userServiceApi.post<RegisterTechnicianResponse>(
    ENDPOINTS.REGISTER_TECHNICIAN,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );

  return response.data;
};

// ─── Get Profile ──────────────────────────────────────────────────────────────

export const getProfileService = async (): Promise<GetProfileResponse> => {
  const response = await authApi.get<GetProfileResponse>(ENDPOINTS.GET_PROFILE);
  const resData = response.data;
  if (typeof window !== 'undefined' && resData.data) {
    try {
      const stored = JSON.parse(localStorage.getItem('user') ?? '{}');
      if (resData.data.createdAt) {
        stored.createdAt = resData.data.createdAt;
      }
      if (resData.data.technicianProfile) {
        stored.technicianProfile = {
          ...stored.technicianProfile,
          createdAt: resData.data.technicianProfile.createdAt,
          status: resData.data.technicianProfile.status,
          updatedAt: resData.data.technicianProfile.updatedAt,
        };
      }
      localStorage.setItem('user', JSON.stringify(stored));
    } catch {
      // ignore
    }
  }
  return resData;
};
