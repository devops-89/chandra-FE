import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getCustomerBookingsService } from '@/services/customerBooking.service';
import type { CustomerBooking, } from '@/types/customerBooking.types';

interface CustomerBookingsState {
  bookings: CustomerBooking[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CustomerBookingsState = {
  bookings: [],
  isLoading: false,
  error: null,
};

export const fetchCustomerBookings = createAsyncThunk<
  CustomerBooking[],
  void,
  { rejectValue: string }
>(
  'customerBookings/fetch',

  async (_, { rejectWithValue }) => {
    try {
      return await getCustomerBookingsService();
    } catch (err) {
      return rejectWithValue(
        err instanceof Error
          ? err.message
          : 'Failed to fetch customer bookings'
      );
    }
  }
);

const customerBookingsSlice = createSlice({
  name: 'customerBookings',

  initialState,

  reducers: {
    clearCustomerBookings(state) {
      state.bookings = [];
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchCustomerBookings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchCustomerBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookings = action.payload;
      })

      .addCase(fetchCustomerBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload ?? 'Unknown error';
      });
  },
});

export const {
  clearCustomerBookings,
} = customerBookingsSlice.actions;

export default customerBookingsSlice.reducer;