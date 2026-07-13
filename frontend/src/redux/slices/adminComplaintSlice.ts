import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getAdminComplaintByIdService } from '@/services/admin.service';
import type { AdminComplaint } from '@/types/admin/complaint.types';

interface AdminComplaintState {
  complaint: AdminComplaint | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AdminComplaintState = {
  complaint: null,
  isLoading: false,
  error: null,
};

// ─── Fetch Complaint By Id ───────────────────────────────────────────

export const fetchAdminComplaint = createAsyncThunk<
  AdminComplaint,
  number,
  { rejectValue: string }
>(
  'adminComplaint/fetch',

  async (id, { rejectWithValue }) => {
    try {
      return await getAdminComplaintByIdService(id);
    } catch (err) {
      return rejectWithValue(
        err instanceof Error
          ? err.message
          : 'Failed to fetch complaint',
      );
    }
  },
);

const adminComplaintSlice = createSlice({
  name: 'adminComplaint',

  initialState,

  reducers: {
    clearAdminComplaint(state) {
      state.complaint = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ─── Fetch Complaint ────────────────────────────────────────

      .addCase(fetchAdminComplaint.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchAdminComplaint.fulfilled, (state, action) => {
        state.isLoading = false;
        state.complaint = action.payload;
      })

      .addCase(fetchAdminComplaint.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload ?? 'Failed to fetch complaint';
      });
  },
});

export const {
  clearAdminComplaint,
} = adminComplaintSlice.actions;

export default adminComplaintSlice.reducer;