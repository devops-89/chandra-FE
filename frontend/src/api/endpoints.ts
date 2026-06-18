export const API_BASE_URL = 'http://13.53.114.78/api';

export const ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  GENERATE_OTP: '/auth/generate-otp',
  VERIFY_OTP: '/auth/verify-otp',

  // Users
  REGISTER_CUSTOMER: '/users/register',

  // Services
  GET_ALL_SERVICES: '/users/service/all',
  CREATE_SERVICE:   '/users/admin/service',
  UPDATE_SERVICE:   '/users/admin/service',  // PATCH /users/admin/service/:id
} as const;
