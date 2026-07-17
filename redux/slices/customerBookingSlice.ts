import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { BookingControllers } from '@/api/bookingControllers';
import type {
  CancelBookingRequest,
  CancelledBooking,
  CustomerBooking,
} from '@/types/customerBooking.types';

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
      return await BookingControllers.getCustomerBookings();
    } catch (err) {
      return rejectWithValue(
        err instanceof Error
          ? err.message
          : 'Failed to fetch customer bookings'
      );
    }
  }
);

export const cancelBooking = createAsyncThunk<
  CancelledBooking,
  CancelBookingRequest,
  { rejectValue: string }
>(
  'customerBookings/cancel',

  async (payload, { rejectWithValue }) => {
    try {
      return await BookingControllers.cancelBooking(payload);
    } catch (err) {
      return rejectWithValue(
        err instanceof Error
          ? err.message
          : 'Failed to cancel booking'
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
      })

      .addCase(cancelBooking.pending, (state) => {
      state.isLoading = true;
    })

      .addCase(cancelBooking.fulfilled, (state, action) => {
      state.isLoading = false;

      const booking = state.bookings.find(
        (b) => b.bookingId === action.payload.bookingId
      );

      if (booking) {
        booking.status = action.payload.status;
        booking.cancelledBy = action.payload.cancelledBy;
        booking.cancelledByRole = action.payload.cancelledByRole;
        booking.cancellationReason =
        action.payload.cancellationReason;
        booking.updatedAt = action.payload.updatedAt;
      }
    })

      .addCase(cancelBooking.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? 'Unknown error';
      })
    },
  });

export const {
  clearCustomerBookings,
} = customerBookingsSlice.actions;

export default customerBookingsSlice.reducer;