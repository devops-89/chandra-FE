import { api } from '@/api/axios';
import { ENDPOINTS } from '@/api/endpoints';

import type {
    LoginRequest,
    LoginResponse,
} from '../types/auth.types';

export const loginService = async (
    payload: LoginRequest
): Promise<LoginResponse> => {
    const response =
        await api.post<LoginResponse>(
            ENDPOINTS.LOGIN,
            payload
        );

    return response.data;
};