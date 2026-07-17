import { AuthControllers } from '@/api/authControllers';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from '@/types/auth.types';

interface ForgotPasswordState {
  isLoading: boolean;
  success: boolean;
  message: string | null;
  error: string | null;
  isVerifying: boolean;
  verifySuccess: boolean;
  verifyError: string | null;

  isResetting: boolean;
  resetSuccess: boolean;
  resetError: string |null;
}

const initialState: ForgotPasswordState = {
  isLoading: false,
  success: false,
  message: null,
  error: null,
  isVerifying: false,
  verifySuccess: false,
  verifyError: null,

  isResetting: false,
  resetSuccess: false,
  resetError: null,
};

export const forgotPassword = createAsyncThunk<
  ForgotPasswordResponse,
  ForgotPasswordRequest,
  { rejectValue: string }
>(
  'auth/forgotPassword',
  async (payload, { rejectWithValue }) => {
    try {
      return await AuthControllers.forgotPassword(payload);
    } catch (err: unknown) {
  const message =
    err &&
    typeof err === 'object' &&
    'response' in err
      ? (
          err as {
            response?: {
              data?: {
                message?: string;
              };
            };
          }
        ).response?.data?.message
      : undefined;

  return rejectWithValue(message ?? 'Failed to send OTP');
}
  }
);

export const resetPassword = createAsyncThunk<
  ResetPasswordResponse,
  ResetPasswordRequest,
  { rejectValue: string }
>(
  'forgotPassword/resetPassword',

  async (payload, { rejectWithValue }) => {
    try {
      return await AuthControllers.resetPassword(payload);
    } catch (err) {
      return rejectWithValue(
        err instanceof Error
          ? err.message
          : 'Failed to reset password'
      );
    }
  }
);

export const verifyForgotPasswordOtp = createAsyncThunk<
  VerifyOtpResponse,
  VerifyOtpRequest,
  { rejectValue: string }
>(
  'auth/verifyForgotPasswordOtp',
  async (payload, { rejectWithValue }) => {
    try {
      return await AuthControllers.verifyOtp(payload);
    } catch (err: unknown) {
        const message =
            err &&
            typeof err === 'object' &&
            'response' in err
            ? (
                err as {
                    response?: {
                    data?: {
                        message?: string;
                    };
                    };
                }
                ).response?.data?.message
            : undefined;

        return rejectWithValue(message ?? 'Failed to verify OTP');
        }
    }
);

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    resetForgotPasswordState(state) {
      state.success = false;
      state.error = null;
      state.message = null;
      state.isVerifying = false;
      state.verifySuccess = false;
      state.verifyError = null;
      state.isResetting = false;
      state.resetSuccess = false;
      state.resetError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Failed';
      })
      .addCase(verifyForgotPasswordOtp.pending, (state) => {
        state.isVerifying = true;
        state.verifyError = null;
        state.verifySuccess = false;
      })
      .addCase(verifyForgotPasswordOtp.fulfilled, (state) => {
        state.isVerifying = false;
        state.verifySuccess = true;
      })
      .addCase(verifyForgotPasswordOtp.rejected, (state, action) => {
        state.isVerifying = false;
        state.verifyError = action.payload ?? 'Failed to verify OTP';
      })
      .addCase(resetPassword.pending, (state) => {
        state.isResetting = true;
        state.resetSuccess = false;
        state.resetError = null;
      })

      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isResetting = false;
        state.resetSuccess = true;
        state.message = action.payload.message;
      })

        .addCase(resetPassword.rejected, (state, action) => {
        state.isResetting = false;
        state.resetError =
        action.payload ?? 'Failed to reset password';
      })
  },
});

export const { resetForgotPasswordState } =
  forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;