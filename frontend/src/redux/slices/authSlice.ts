import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit';

import type { User } from '@/types/auth.types';

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',

    initialState,

    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{
                user: User;
                accessToken: string;
                refreshToken: string;
            }>
        ) => {
            state.user = action.payload.user;
            state.accessToken =
                action.payload.accessToken;
            state.refreshToken =
                action.payload.refreshToken;
            state.isAuthenticated = true;
        },

        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
        },

        updateUser: (state, action: PayloadAction<Partial<User>>) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            }
        },
    },
});

export const {
    setCredentials,
    logout,
    updateUser,
} = authSlice.actions;

export default authSlice.reducer;