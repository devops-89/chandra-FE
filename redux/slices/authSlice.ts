import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { User } from '@/types/auth.types';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

// ── Hydrate from localStorage on app start ────────────────────────────────────
// Tokens and user survive page refresh and tab close.

function getInitialState(): AuthState {
  if (typeof window === 'undefined') {
    return { user: null, accessToken: null, refreshToken: null, isAuthenticated: false };
  }
  try {
    const userStr      = localStorage.getItem('user');
    const accessToken  = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (userStr && accessToken) {
      return {
        user:            JSON.parse(userStr) as User,
        accessToken,
        refreshToken:    refreshToken ?? null,
        isAuthenticated: true,
      };
    }
  } catch {
    // Malformed data — fall through to logged-out state
  }
  return { user: null, accessToken: null, refreshToken: null, isAuthenticated: false };
}

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState,

  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; accessToken: string; refreshToken?: string }>,
    ) => {
      const previousUserId = state.user?.id;

      state.user            = action.payload.user;
      state.accessToken     = action.payload.accessToken;
      state.refreshToken    = action.payload.refreshToken ?? null;
      state.isAuthenticated = true;

      if (typeof window !== 'undefined') {
        if (previousUserId && previousUserId !== action.payload.user.id) {
          localStorage.removeItem('hichandra-booking');
        }
        localStorage.setItem('user',        JSON.stringify(action.payload.user));
        localStorage.setItem('accessToken', action.payload.accessToken);
        if (action.payload.refreshToken) {
          localStorage.setItem('refreshToken', action.payload.refreshToken);
        }
      }
    },

    /** Called after Refresh Token Rotation — updates BOTH tokens in Redux + localStorage. */
    updateTokens: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>,
    ) => {
      state.accessToken  = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;

      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken',  action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      }
    },

    logout: (state) => {
      state.user            = null;
      state.accessToken     = null;
      state.refreshToken    = null;
      state.isAuthenticated = false;

      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('hichandra-booking');
      }
    },

    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(state.user));
        }
      }
    },
  },
});

import { AuthControllers } from '@/api/authControllers';

import type { AppDispatch } from '../store';

export const { setCredentials, updateTokens, logout, updateUser } = authSlice.actions;

export const logoutUser = () => async (dispatch: AppDispatch) => {
  try {
    await AuthControllers.logout();
  } catch (error) {
    console.error('Logout API error:', error);
  } finally {
    dispatch(logout());
  }
};

export default authSlice.reducer;
