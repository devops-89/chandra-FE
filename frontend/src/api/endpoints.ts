export const API_BASE_URL = 'http://192.168.1.58:8000/api';

export const ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  GENERATE_OTP: '/auth/generate-otp',
  VERIFY_OTP: '/auth/verify-otp',

  // Users
  REGISTER_CUSTOMER: '/users/register',
} as const;
