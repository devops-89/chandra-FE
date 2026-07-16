import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import { createTokenPaymentLinkService } from '@/services/tokenPayment.service';
import type { TokenPaymentLink } from '@/types/customer/tokenPayment.types';

interface TokenPaymentState {
  payment: TokenPaymentLink | null;

  isLoading: boolean;

  error: string | null;
}

const initialState: TokenPaymentState = {
  payment: null,

  isLoading: false,

  error: null,
};

export const createTokenPaymentLink =
  createAsyncThunk<
    TokenPaymentLink,
    void,
    { rejectValue: string }
  >(
    'tokenPayment/create',

    async (_, { rejectWithValue }) => {
      try {
        return await createTokenPaymentLinkService();
      } catch (err) {
        return rejectWithValue(
          err instanceof Error
            ? err.message
            : 'Failed to create payment link',
        );
      }
    },
  );

const tokenPaymentSlice = createSlice({
  name: 'tokenPayment',

  initialState,

  reducers: {
    clearPayment(state) {
      state.payment = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(createTokenPaymentLink.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(createTokenPaymentLink.fulfilled, (state, action) => {
        state.isLoading = false;
        state.payment = action.payload;
      })

      .addCase(createTokenPaymentLink.rejected, (state, action) => {
        state.isLoading = false;

        state.error =
          action.payload ??
          'Failed to create payment link';
      });
  },
});

export const {
  clearPayment,
} = tokenPaymentSlice.actions;

export default tokenPaymentSlice.reducer;