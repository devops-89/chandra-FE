import axios from 'axios';

import { API_BASE_URL } from './endpoints';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token =
        typeof window !== 'undefined'
            ? localStorage.getItem('accessToken')
            : null;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Log full error response body in dev so we can see exact validation messages
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error(
                `[API ${error.response.status}] ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
                error.response.data
            );
        }
        return Promise.reject(error);
    }
);