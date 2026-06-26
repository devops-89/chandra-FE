export const API_BASE_URLS = {
  auth: 'http://192.168.1.37:8000/api',
  userService: 'http://192.168.1.37:8001/api',
} as const;

export type ApiServicePurpose = keyof typeof API_BASE_URLS;

export const getApiBaseUrl = (purpose: ApiServicePurpose) => API_BASE_URLS[purpose];

export const API_BASE_URL = getApiBaseUrl('auth');

export const ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  GENERATE_OTP: '/auth/generate-otp',
  VERIFY_OTP: '/auth/verify-otp',

  // Users
  REGISTER_CUSTOMER: '/users/register',

  // Services
  GET_ALL_SERVICES: '/users/service/all',
  GET_SERVICE_BY_ID: '/users/service', // GET /users/service/:id
  CREATE_SERVICE: '/users/admin/service',
  UPDATE_SERVICE: '/users/update/service', // PATCH /users/admin/service/:id
  DELETE_SERVICE: '/users/delete/service'
} as const;
