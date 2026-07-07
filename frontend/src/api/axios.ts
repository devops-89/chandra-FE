import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

import { logout, updateAccessToken } from '@/redux/slices/authSlice';
import { store } from '@/redux/store';

import { API_BASE_URLS, type ApiServicePurpose, getApiBaseUrl } from './endpoints';

// ── Refresh-queue state ───────────────────────────────────────────────────────

let isRefreshing = false;

type QueueEntry = { resolve: (token: string) => void; reject: (err: unknown) => void };
let refreshQueue: QueueEntry[] = [];

function processQueue(error: unknown, token: string | null) {
  refreshQueue.forEach((e) => (error ? e.reject(error) : e.resolve(token!)));
  refreshQueue = [];
}

function forceLogout() {
  store.dispatch(logout());
  if (typeof window !== 'undefined') window.location.href = '/login';
}

// ── Request interceptor ───────────────────────────────────────────────────────
// Reads access token from localStorage (persists across refresh/tab-close).
// Falls back to Redux store for contexts without localStorage.

function attachRequestInterceptor(client: AxiosInstance) {
  client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token =
      (typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null)
      ?? store.getState().auth.accessToken;

    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
}

// ── Response interceptor ──────────────────────────────────────────────────────
// On 401: attempt a silent refresh using the stored refresh token, retry.

function attachResponseInterceptor(client: AxiosInstance) {
  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      if (error.response && error.response.status !== 401) {
        console.error(
          `[API ${error.response.status}] ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
          error.response.data,
        );
        return Promise.reject(error);
      }

      if (
        !error.response
        || error.response.status !== 401
        || originalRequest._retry
        || originalRequest.url?.includes('/auth/refresh')
      ) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          refreshQueue.push({ resolve, reject });
        }).then((newToken) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return client(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const storedRefreshToken =
        (typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null)
        ?? store.getState().auth.refreshToken;

      if (!storedRefreshToken) {
        isRefreshing = false;
        processQueue(new Error('No refresh token'), null);
        forceLogout();
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(
          `${API_BASE_URLS.auth}/auth/refresh`,
          { refreshToken: storedRefreshToken },
          { headers: { 'Content-Type': 'application/json' } },
        );

        const newToken: string =
          res.data?.data?.tokens?.accessToken
          ?? res.data?.data?.accessToken
          ?? res.data?.accessToken;

        store.dispatch(updateAccessToken(newToken));
        processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return client(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        forceLogout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    },
  );
}

// ── Factory ───────────────────────────────────────────────────────────────────

function createApiClient(purpose: ApiServicePurpose): AxiosInstance {
  const client = axios.create({
    baseURL: getApiBaseUrl(purpose),
    headers: { 'Content-Type': 'application/json' },
  });

  attachRequestInterceptor(client);
  attachResponseInterceptor(client);

  return client;
}

export { createApiClient };
export const authApi        = createApiClient('auth');
export const userServiceApi = createApiClient('userService');
export const getApiClient   = (purpose: ApiServicePurpose) =>
  purpose === 'auth' ? authApi : userServiceApi;
export const api = userServiceApi;
