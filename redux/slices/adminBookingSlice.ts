import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AdminControllers } from '@/api/adminControllers';
import type {
  AdminBooking,
  BookingPagination,
} from '@/types/admin/bookings.types';

interface AdminBookingState {
  bookings: AdminBooking[];
  pagination: BookingPagination | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AdminBookingState = {
  bookings: [],
  pagination: null,
  isLoading: false,
  error: null,
};

export const fetchAdminBookings = createAsyncThunk<
  {
    bookings: AdminBooking[];
    pagination: BookingPagination;
  },
  {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  },
  { rejectValue: string }
>(
  'adminBookings/fetch',

  async ({ page = 1, limit = 10, status, search }, { rejectWithValue }) => {
    try {
      return await AdminControllers.getAdminBookings(page, limit, status, search);
    } catch (err) {
      return rejectWithValue(
        err instanceof Error
          ? err.message
          : 'Failed to fetch bookings',
      );
    }
  },
);

const adminBookingSlice = createSlice({
  name: 'adminBookings',

  initialState,

  reducers: {
    clearAdminBookings(state) {
      state.bookings = [];
      state.pagination = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchAdminBookings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchAdminBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookings = action.payload.bookings;
        state.pagination = action.payload.pagination;
      })

      .addCase(fetchAdminBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload ?? 'Failed to fetch bookings';
      });
  },
});

export const {
  clearAdminBookings,
} = adminBookingSlice.actions;

export default adminBookingSlice.reducer;