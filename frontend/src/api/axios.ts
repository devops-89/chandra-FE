import axios, { type AxiosInstance } from 'axios';

import { type ApiServicePurpose, getApiBaseUrl } from './endpoints';

const attachInterceptors = (client: AxiosInstance) => {
  client.interceptors.request.use((config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        console.error(
          `[API ${error.response.status}] ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
          error.response.data,
        );
      }
      return Promise.reject(error);
    },
  );

  return client;
};

export const createApiClient = (purpose: ApiServicePurpose) =>
  attachInterceptors(
    axios.create({
      baseURL: getApiBaseUrl(purpose),
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  );

export const authApi = createApiClient('auth');
export const userServiceApi = createApiClient('userService');

export const getApiClient = (purpose: ApiServicePurpose) =>
  purpose === 'auth' ? authApi : userServiceApi;

export const api = userServiceApi;
