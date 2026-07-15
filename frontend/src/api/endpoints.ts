export const API_BASE_URLS = {
  auth: 'http://16.171.154.15/api',
  userService: 'http://16.171.154.15/api',
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
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',

  // Users
  REGISTER_CUSTOMER: '/users/register',
  REGISTER_TECHNICIAN: '/users/register',  // same endpoint, role determined by payload

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
  GET_CUSTOMER_ADDRESSES: '/users/customer/addresses',
  CREATE_ADDRESS: '/users/customer/address',
  UPDATE_ADDRESS: '/users/customer/address',
  DELETE_ADDRESS: '/users/customer/address', // DELETE /users/customer/address/:id

  //Bookings
  GET_CUSTOMER_BOOKINGS: '/bookings/all',
  CREATE_BOOKING: '/bookings',
  CANCEL_BOOKING: '/bookings/cancel',
  RESCHEDULE_BOOKING: '/bookings/reschedule',
  ADMIN_BOOKINGS: '/bookings/all',

  //Complaints
  CREATE_COMPLAINT: '/bookings/complaint',
  UPDATE_COMPLAINT: '/bookings/complaint',
  ADMIN_COMPLAINTS: '/bookings/complaints',
  ADMIN_COMPLAINTS_BY_ID: '/bookings/admin/complaints',
  DELETE_COMPLAINT: '/bookings/complaint',
  ADMIN_RESOLVE_COMPLAINT: '/bookings/admin/complaints/resolve',

  //Dashboard
  CUSTOMER_DASHBOARD_STATS:'/users/customer/dashboard-stats',
  FAVOURITE_TECHNICIANS:'/users/favourite-technicians',

} as const;