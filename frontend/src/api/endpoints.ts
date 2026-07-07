export const API_BASE_URLS = {
  auth: 'http://192.168.1.6:8000/api',
  userService: 'http://192.168.1.6:8001/api',
} as const;

export type ApiServicePurpose = keyof typeof API_BASE_URLS;


export const getApiBaseUrl = (purpose: ApiServicePurpose) => API_BASE_URLS[purpose];

export const API_BASE_URL = getApiBaseUrl('auth');

export const ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REFRESH_TOKEN: '/auth/refresh-token',
  GENERATE_OTP: '/auth/generate-otp',
  VERIFY_OTP: '/auth/verify-otp',
  GET_PROFILE: '/auth/profile',

  // Users
  REGISTER_CUSTOMER: '/users/register',
  REGISTER_TECHNICIAN: '/users/register',    // same endpoint, role determined by payload

  // Services
  GET_ALL_SERVICES: '/users/service/all',
  GET_SERVICE_BY_ID: '/users/service', // GET /users/service/:id
  CREATE_SERVICE: '/users/admin/service',
  UPDATE_SERVICE: '/users/update/service', // PATCH /users/admin/service/:id

  DELETE_SERVICE: '/users/delete/service',

  //Profile
  UPDATE_PROFILE: "/users/profile",
  CHANGE_PASSWORD: "/users/change-password",
  PROFILE: '/auth/profile',

  //Address
  CREATE_ADDRESS: '/users/customer/address',
  UPDATE_ADDRESS: '/users/customer/address',
  DELETE_ADDRESS: '/users/customer/address', // DELETE /users/customer/address/:id

  //Bookings

  CREATE_BOOKING: '/bookings',

  //Complaints

  CREATE_COMPLAINT: '/bookings/complaint',
  UPDATE_COMPLAINT: '/bookings/complaint',

} as const;