import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CustomerControllers } from '@/api/customerControllers';
import type { CustomerDashboardStats } from '@/types/customer/dashboard.types';

interface CustomerDashboardState {
  stats: CustomerDashboardStats | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CustomerDashboardState = {
  stats: null,
  isLoading: false,
  error: null,
};

export const fetchCustomerDashboardStats =
  createAsyncThunk<
    CustomerDashboardStats,
    void,
    { rejectValue: string }
  >(
    'customerDashboard/fetchStats',

    async (_, { rejectWithValue }) => {
      try {
        return await CustomerControllers.getCustomerDashboardStats();
      } catch (err) {
        return rejectWithValue(
          err instanceof Error
            ? err.message
            : 'Failed to fetch dashboard stats',
        );
      }
    },
  );

const customerDashboardSlice = createSlice({
  name: 'customerDashboard',

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchCustomerDashboardStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(
        fetchCustomerDashboardStats.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.stats = action.payload;
        },
      )

      .addCase(
        fetchCustomerDashboardStats.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error =
            action.payload ??
            'Failed to fetch dashboard stats';
        },
      );
  },
});

export default customerDashboardSlice.reducer;