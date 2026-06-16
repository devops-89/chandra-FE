export const API_BASE_URL = '/api';

export const ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  GENERATE_OTP: '/auth/generate-otp',
  VERIFY_OTP: '/auth/verify-otp',

  // Users
  REGISTER_CUSTOMER: '/users/register',
} as const;
