import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

import { type ApiServicePurpose, API_BASE_URLS, getApiBaseUrl } from './endpoints';
import { store } from '@/redux/store';
import { logout, updateTokens } from '@/redux/slices/authSlice';

// ── Refresh-queue state ───────────────────────────────────────────────────────
// Ensures only one refresh call is in-flight at any time.
// All 401-failing requests while a refresh is pending are queued here.

let isRefreshing = false;

type QueueEntry = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

let refreshQueue: QueueEntry[] = [];

function processQueue(error: unknown, token: string | null) {
  refreshQueue.forEach((entry) => {
    if (error) {
      entry.reject(error);
    } else {
      entry.resolve(token!);
    }
  });
  refreshQueue = [];
}

// ── Force logout helper (called when refresh fails) ───────────────────────────
function forceLogout() {
  store.dispatch(logout());
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
}

// ── Request interceptor ───────────────────────────────────────────────────────
// Reads the access token from localStorage (survives page refresh / HMR).
// Falls back to Redux store so tests / SSR contexts work without localStorage.

function attachRequestInterceptor(client: AxiosInstance) {
  client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token =
      (typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null) ??
      store.getState().auth.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });
}

// ── Response interceptor ──────────────────────────────────────────────────────
// On 401:
//   1. If a refresh is already in-flight, queue this request and wait.
//   2. Otherwise, start a refresh, update tokens, drain the queue, retry.
//   3. If the refresh itself fails, force-logout and reject everything.

function attachResponseInterceptor(client: AxiosInstance) {
  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      // Log non-401 errors for debugging.
      if (error.response && error.response.status !== 401) {
        console.error(
          `[API ${error.response.status}] ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
          error.response.data,
        );
        return Promise.reject(error);
      }

      // Avoid infinite retry loops on the refresh endpoint itself.
      if (
        !error.response ||
        error.response.status !== 401 ||
        originalRequest._retry ||
        originalRequest.url?.includes('/auth/refresh-token')
      ) {
        return Promise.reject(error);
      }

      // ── Already refreshing — queue this request ───────────────────────────
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          refreshQueue.push({ resolve, reject });
        })
          .then((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return client(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      // ── Start the refresh ─────────────────────────────────────────────────
      originalRequest._retry = true;
      isRefreshing = true;

      const storedRefreshToken =
        (typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null) ??
        store.getState().auth.refreshToken;

      if (!storedRefreshToken) {
        isRefreshing = false;
        processQueue(new Error('No refresh token'), null);
        forceLogout();
        return Promise.reject(error);
      }

      try {
        // Use a plain axios instance (no interceptors) to avoid recursive loops.
        const refreshResponse = await axios.post(
          `${API_BASE_URLS.auth}/auth/refresh-token`,
          { refreshToken: storedRefreshToken },
          { headers: { 'Content-Type': 'application/json' } },
        );

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          refreshResponse.data?.data ?? refreshResponse.data;

        // Persist new tokens.
        store.dispatch(updateTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken }));

        // Drain the queue with the fresh token.
        processQueue(null, newAccessToken);

        // Retry the original request.
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
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

export const getApiClient = (purpose: ApiServicePurpose) =>
  purpose === 'auth' ? authApi : userServiceApi;

export const api = userServiceApi;

