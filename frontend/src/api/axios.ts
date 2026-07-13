import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

import { logout, updateTokens } from '@/redux/slices/authSlice';
import { getAppStore } from '@/redux/storeAccessor';

import { API_BASE_URLS, type ApiServicePurpose, ENDPOINTS, getApiBaseUrl } from './endpoints';

// ── Refresh-queue state ───────────────────────────────────────────────────────

let isRefreshing = false;

type QueueEntry = { resolve: (token: string) => void; reject: (err: unknown) => void };
let refreshQueue: QueueEntry[] = [];

function processQueue(error: unknown, token: string | null) {
  refreshQueue.forEach((e) => (error ? e.reject(error) : e.resolve(token!)));
  refreshQueue = [];
}

function forceLogout() {
  getAppStore().dispatch(logout());
  if (typeof window !== 'undefined') window.location.href = '/login';
}

// ── Request interceptor ───────────────────────────────────────────────────────
// Reads access token from localStorage (persists across refresh/tab-close).
// Falls back to Redux store for contexts without localStorage.

function attachRequestInterceptor(client: AxiosInstance) {
  client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token =
      (typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null)
      ?? getAppStore().getState().auth.accessToken;

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
        || originalRequest.url?.includes('/auth/refresh-token') ||
        originalRequest.url?.includes('/auth/login') ||
        originalRequest.url?.includes('/auth/refresh-token') ||
        originalRequest.url?.includes('/auth/forgot-password') ||
        originalRequest.url?.includes('/auth/reset-password')
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
        ?? getAppStore().getState().auth.refreshToken;

      if (!storedRefreshToken) {
        isRefreshing = false;
        processQueue(new Error('No refresh token'), null);
        // Only logout if there genuinely is no refresh token stored
        // (user was never authenticated, not a transient failure)
        const hasUser = typeof window !== 'undefined' && !!localStorage.getItem('user');
        if (!hasUser) forceLogout();
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(
          `${API_BASE_URLS.auth}${ENDPOINTS.REFRESH_TOKEN}`,
          { refreshToken: storedRefreshToken },
          { headers: { 'Content-Type': 'application/json' } },
        );

        // ── Extract both tokens from the response ─────────────────────────────
        // Backend uses Refresh Token Rotation: both accessToken AND refreshToken
        // are rotated on every refresh. The old refreshToken is immediately invalid.
        const newAccessToken: string | undefined =
          res.data?.data?.tokens?.accessToken
          ?? res.data?.data?.accessToken
          ?? res.data?.accessToken;


        const newRefreshToken: string | undefined =
          res.data?.data?.tokens?.refreshToken
          ?? res.data?.data?.refreshToken
          ?? res.data?.refreshToken;


        // ── Validate both tokens exist before updating state ──────────────────
        // If either is missing the response is malformed — reject without
        // touching auth state so the user is not inadvertently logged out.
        if (!newAccessToken || !newRefreshToken) {
          const missingMsg = `Refresh response missing tokens. accessToken=${!!newAccessToken} refreshToken=${!!newRefreshToken}`;
          console.error('[Auth]', missingMsg);
          processQueue(new Error(missingMsg), null);
          return Promise.reject(new Error(missingMsg));
        }

        // ── Persist rotated tokens (both Redux + localStorage) ────────────────
        getAppStore().dispatch(updateTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken }));
        processQueue(null, newAccessToken);

        // ── Retry the original request with the new access token ──────────────
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return client(originalRequest);
      } catch (refreshError: unknown) {
        processQueue(refreshError, null);

        // Force logout ONLY when the refresh endpoint explicitly rejects the token.
        // 401 = token expired/invalid. 403 = token blacklisted/revoked.
        // Do NOT logout on: network failure, timeout, 500, validation error, backend unavailable.
        const refreshStatus = (refreshError as { response?: { status?: number } })?.response?.status;
        if (refreshStatus === 401 || refreshStatus === 403) {
          forceLogout();
        }

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
