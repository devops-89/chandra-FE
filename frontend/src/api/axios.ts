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