import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  getAdminComplaintByIdService,
  getAdminComplaintsService,
} from '@/services/admin.service';

import type {
  AdminComplaint,
  AdminComplaintListItem,
  ComplaintPagination,
} from '@/types/admin/complaints.types';

interface AdminComplaintState {
  complaint: AdminComplaint | null;

  complaints: AdminComplaintListItem[];
  pagination: ComplaintPagination | null;

  isLoading: boolean;
  error: string | null;
}

const initialState: AdminComplaintState = {
  complaint: null,

  complaints: [],
  pagination: null,

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

export const fetchAdminComplaints = createAsyncThunk<
  {
    complaints: AdminComplaintListItem[];
    pagination: ComplaintPagination;
  },
  void,
  { rejectValue: string }
>(
  'adminComplaint/fetchAll',

  async (_, { rejectWithValue }) => {
    try {
      return await getAdminComplaintsService();
    } catch (err) {
      return rejectWithValue(
        err instanceof Error
          ? err.message
          : 'Failed to fetch complaints',
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

        state.complaints = [];
        state.pagination = null;

        state.error = null;
    }
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
      })

      // ─── Fetch All Complaints ─────────────────────────────

      .addCase(fetchAdminComplaints.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchAdminComplaints.fulfilled, (state, action) => {
        state.isLoading = false;

        state.complaints = action.payload.complaints;
        state.pagination = action.payload.pagination;
      })

      .addCase(fetchAdminComplaints.rejected, (state, action) => {
        state.isLoading = false;

        state.error =
        action.payload ?? 'Failed to fetch complaints';
      });
  },
});

export const {
  clearAdminComplaint,
} = adminComplaintSlice.actions;

export default adminComplaintSlice.reducer;