import axios, { type AxiosError, type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { setupCache, buildMemoryStorage } from 'axios-cache-interceptor';

import { logout, updateTokens } from '@/redux/slices/authSlice';
import { getAppStore } from '@/redux/storeAccessor';

import { SERVER_ENDPOINTS } from './serverConstant';

export const globalApiCache = buildMemoryStorage();

const authSecuredApi = setupCache(axios.create({
  baseURL: SERVER_ENDPOINTS.AUTH_BASEURL,
}), { storage: globalApiCache, methods: ['get'], interpretHeader: false, ttl: 1000 * 60 * 5 });

authSecuredApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token =
      (typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null) ??
      getAppStore().getState().auth.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const authPublicApi = setupCache(axios.create({
  baseURL: SERVER_ENDPOINTS.AUTH_BASEURL,
}), { storage: globalApiCache, methods: ['get'], interpretHeader: false, ttl: 1000 * 60 * 5 });

const userSecuredApi = setupCache(axios.create({
  baseURL: SERVER_ENDPOINTS.USER_BASEURL,
}), { storage: globalApiCache, methods: ['get'], interpretHeader: false, ttl: 1000 * 60 * 5 });

userSecuredApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token =
      (typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null) ??
      getAppStore().getState().auth.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const userPublicApi = setupCache(axios.create({
  baseURL: SERVER_ENDPOINTS.USER_BASEURL,
}), { storage: globalApiCache, methods: ['get'], interpretHeader: false, ttl: 1000 * 60 * 5 });

export { authPublicApi, authSecuredApi, userPublicApi, userSecuredApi };

let isRefreshing = false;

interface FailedQueueItem {
  resolve: (value: string | null) => void;
  reject: (reason?: unknown) => void;
}

let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

function forceLogout() {
  getAppStore().dispatch(logout());
  if (typeof window !== 'undefined') window.location.href = '/login';
}

import { showSnackbar } from '@/redux/slices/snackbarSlice';

const setupResponseInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Auto-show success messages for mutations
      const method = response.config.method?.toLowerCase() || '';
      const url = response.config.url || '';

      if (['post', 'put', 'patch', 'delete'].includes(method) && !url.includes('/auth/refresh-token')) {
        // Clear entire cache on any successful mutation to ensure fresh data
        globalApiCache.clear?.();

        let msg = response.data?.message;
        if (typeof msg === 'string' && msg.toLowerCase().includes('complaint deleted permanently')) {
          msg = 'Complaint Deleted Successfully';
        }

        if (msg) {
          let severity: 'success' | 'info' | 'warning' | 'error' = 'success';
          if (method === 'delete') severity = 'error'; // Red
          else severity = 'success'; // Green for POST, PUT, PATCH

          getAppStore().dispatch(showSnackbar({ message: msg, severity }));
        }
      }
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      // Auto-show error messages
      const errMsg = (error.response?.data as { message?: string })?.message || error.message || 'An error occurred';
      if (error.response?.status !== 401) {
        // Don't show toast for 401s if we are just refreshing the token
        if (!originalRequest || !originalRequest._retry) {
          getAppStore().dispatch(showSnackbar({ message: errMsg, severity: 'error' }));
        }
      }

      if (!originalRequest) return Promise.reject(error);

      if (
        !error.response ||
        error.response.status !== 401 ||
        originalRequest._retry ||
        originalRequest.url?.includes('/auth/refresh-token') ||
        originalRequest.url?.includes('/auth/login') ||
        originalRequest.url?.includes('/auth/forgot-password') ||
        originalRequest.url?.includes('/auth/reset-password')
      ) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise<string | null>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (token) {
              originalRequest.headers.Authorization = 'Bearer ' + token;
            }
            return instance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const storedRefreshToken =
          (typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null) ??
          getAppStore().getState().auth.refreshToken;

        if (!storedRefreshToken) {
          throw new Error('No refresh token available');
        }

        const res = await authPublicApi.post('/auth/refresh-token', { refreshToken: storedRefreshToken });

        const newAccessToken: string | undefined =
          res.data?.data?.tokens?.accessToken ?? res.data?.data?.accessToken ?? res.data?.accessToken;

        const newRefreshToken: string | undefined =
          res.data?.data?.tokens?.refreshToken ?? res.data?.data?.refreshToken ?? res.data?.refreshToken;

        if (!newAccessToken || !newRefreshToken) {
          throw new Error('Refresh response missing tokens');
        }

        getAppStore().dispatch(updateTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken }));

        instance.defaults.headers.common.Authorization = 'Bearer ' + newAccessToken;
        originalRequest.headers.Authorization = 'Bearer ' + newAccessToken;

        processQueue(null, newAccessToken);
        return instance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        const refreshStatus = (refreshError as { response?: { status?: number } })?.response?.status;
        if (refreshStatus === 401 || refreshStatus === 403 || !refreshStatus) {
          forceLogout();
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
  );
};

setupResponseInterceptor(authSecuredApi);
setupResponseInterceptor(userSecuredApi);
setupResponseInterceptor(authPublicApi);
setupResponseInterceptor(userPublicApi);
