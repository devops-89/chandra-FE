// ─── Form Data ───────────────────────────────────────────────────────────────

export interface SignupFormData {
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

export interface SignupErrors {
  firstName?: string;
  lastName?: string;
  username?: string;
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
  email: string | null;
  username: string;
  phone?: string | null;
  firstName: string;
  lastName: string | null;
  role: string;
  status?: string;
  technicianProfile?: ApiTechnicianProfileData | null;
}

// ─── Login ────────────────────────────────────────────────────────────────────

export interface LoginRequest {
  identifier: string;
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

// ─── Forgot Password ──────────────────────────────────────────────────────────

export interface ForgotPasswordRequest {
  phone: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    message: string;
  };
}

// ─── Reset Password ─────────────────────────────────────────────────────────────

export interface ResetPasswordRequest {
  phone: string;
  otp: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    message: string;
  };
}

// ─── Generate OTP ─────────────────────────────────────────────────────────────

export interface GenerateOtpRequest {
  phone: string;
  role: 'CUSTOMER' | 'TECHNICIAN';
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
  phone: string;
  email?: string;
  username: string;
  firstName: string;
  lastName?: string;
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

// ─── Register Technician ─────────────────────────────────────────────────────

/** Sent as multipart/form-data to POST /users/register (TECHNICIAN role) */
export interface RegisterTechnicianRequest {
  email?: string;
  username: string;
  phone: string;
  firstName: string;
  lastName?: string;
  password: string;
}

export interface TechnicianProfile {
  id: number;
  userId: number;
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED';
  serviceRadiusKm: number;
  pincodes: string[];
  hasLadder: boolean;
  hasACGauges: boolean;
  hasSafetyEquipment: boolean;
  hasVehicle: boolean;
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
}

export interface RegisterTechnicianResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    message: string;
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
    user: User & {
      status: string;
      phone: string;
      technicianProfile: TechnicianProfile & {
        selfieUrl?: string | null;
        aadharUrl?: string | null;
        panUrl: string | null;
        policeCertUrl: string | null;
        tradeLicenseUrl: string | null;
      };
    };
  };
}

// ─── Technician Profile (GET /auth/profile) ──────────────────────────────────

/** Legacy — no longer written by new flows; kept for backward compatibility. */
export interface ApiTechnicianSkillEntry {
  id: number;
  technicianProfileId: number;
  skill: string;
  skillLevel: string;
  createdAt: string;
}

export interface ApiTechnicianServiceEntry {
  id: number;
  technicianProfileId: number;
  serviceId: number;
  serviceName?: string;
  createdAt?: string;
}

export interface ApiServiceArea {
  id: number;
  technicianProfileId: number;
  pincode: string;
  areaName: string;
  createdAt: string;
}

export interface ApiBrandExpertise {
  id: number;
  technicianProfileId: number;
  brandName: string;
  createdAt: string;
}

export interface ApiTechnicianProfileData {
  id: number;
  userId: number;
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED';
  address: string | null;
  yearsOfExperience: number | null;
  languages: string[];
  serviceRadiusKm: number;
  pincodes: string[];
  aadharUrl?: string | null;
  panUrl: string | null;
  policeCertUrl: string | null;
  tradeLicenseUrl: string | null;
  selfieUrl: string | null;
  hasLadder: boolean;
  hasACGauges: boolean;
  hasSafetyEquipment: boolean;
  hasVehicle: boolean;
  accountHolderName: string | null;
  accountNumber: string | null;
  ifscCode: string | null;
  bankName: string | null;
  isVerified: boolean;
  /** Legacy — no longer populated by new flows. */
  skills: ApiTechnicianSkillEntry[];
  /** Services selected by the technician in the Skills & Equipments step. */
  services: ApiTechnicianServiceEntry[];
  serviceAreas: ApiServiceArea[];
  brandExpertise: ApiBrandExpertise[];
  /** Timestamp when the technician profile was created — represents application submission date. */
  createdAt?: string;
  updatedAt?: string;
}

export interface GetProfileResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: number;
    email: string;
    username: string;
    phone: string;
    firstName: string;
    lastName: string;
    profileImage: string | null;
    role: string;
    /** User-level status — 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' etc. */
    status: string;
    createdAt?: string;
    technicianProfileId: number | null;
    technicianProfile: ApiTechnicianProfileData | null;
  };
}

// ─── Legacy — kept for backward compat ───────────────────────────────────────

/** @deprecated use RegisterCustomerRequest */
export type SignupRequest = RegisterCustomerRequest;
/** @deprecated use RegisterCustomerResponse */
export type SignupResponse = RegisterCustomerResponse;
