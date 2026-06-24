export const API_BASE_URL ="http://192.168.1.49:8001/api";

export const ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  GENERATE_OTP: '/auth/generate-otp',
  VERIFY_OTP: '/auth/verify-otp',

  // Users
  REGISTER_CUSTOMER: '/users/register',

  // Services
  GET_ALL_SERVICES:   '/users/service/all',
  GET_SERVICE_BY_ID:  '/users/service',      // GET /users/service/:id
  CREATE_SERVICE:     '/users/admin/service',
  UPDATE_SERVICE:     '/users/admin/service',  // PATCH /users/admin/service/:id

  DELETE_SERVICE: (serviceId: number | string) =>
  `/users/delete/service/${serviceId}`,
} as const;
