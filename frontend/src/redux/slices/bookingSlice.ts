import { createAsyncThunk, createSlice, } from '@reduxjs/toolkit';

import { createBookingService, rescheduleBookingService } from '@/services/booking.service';
import type {
  Booking,
  CreateBookingRequest,
} from '@/types/booking.types';

interface BookingState {
  booking: Booking | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  booking: null,
  isLoading: false,
  error: null,
};

export const createBooking = createAsyncThunk<
  Booking,
  CreateBookingRequest,
  { rejectValue: string }
>(
  'booking/create',

  async (payload, { rejectWithValue }) => {
    try {
      return await createBookingService(payload);
    } catch (err) {
      return rejectWithValue(
        err instanceof Error
          ? err.message
          : 'Failed to create booking'
      );
    }
  }
);

export const rescheduleBooking = createAsyncThunk<
  Booking,
  {
    bookingId: number;
    scheduledAt: string;
  },
  { rejectValue: string }
>(
  'booking/reschedule',

  async ({ bookingId, scheduledAt }, { rejectWithValue }) => {
    try {
      return await rescheduleBookingService(
        bookingId,
        { scheduledAt },
      );
    } catch (err) {
      return rejectWithValue(
        err instanceof Error
          ? err.message
          : 'Failed to reschedule booking',
      );
    }
  },
);

const bookingSlice = createSlice({
  name: 'booking',

  initialState,

  reducers: {
    clearBooking(state) {
      state.booking = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(createBooking.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(createBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.booking = action.payload;
      })

      .addCase(createBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Unknown error';
      });
  },
});

export const {
  clearBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;