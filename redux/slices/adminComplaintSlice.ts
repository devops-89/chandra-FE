import { AdminControllers } from '@/api/adminControllers';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type {
  AdminComplaint,
  AdminComplaintListItem,
  ComplaintPagination,
  ResolveComplaintRequest,
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
      return await AdminControllers.getAdminComplaintById(id);
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
      return await AdminControllers.getAdminComplaints();
    } catch (err) {
      return rejectWithValue(
        err instanceof Error
          ? err.message
          : 'Failed to fetch complaints',
      );
    }
  },
);

export const deleteAdminComplaint = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>(
  'adminComplaint/delete',

  async (id, { rejectWithValue }) => {
    try {
      await AdminControllers.deleteComplaint(id);

      return id;
    } catch (err) {
      return rejectWithValue(
        err instanceof Error
          ? err.message
          : 'Failed to delete complaint',
      );
    }
  },
);

export const resolveAdminComplaint = createAsyncThunk<
  AdminComplaint,
  ResolveComplaintRequest,
  { rejectValue: string }
>(
  'adminComplaint/resolve',

  async (payload, { rejectWithValue }) => {
    try {
      return await AdminControllers.resolveAdminComplaint(payload);
    } catch (err) {
      return rejectWithValue(
        err instanceof Error
          ? err.message
          : 'Failed to resolve complaint',
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
      })

      .addCase(deleteAdminComplaint.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(deleteAdminComplaint.fulfilled, (state, action) => {
        state.isLoading = false;

        state.complaints = state.complaints.filter(
          complaint => complaint.id !== action.payload,
        );
      })

      .addCase(deleteAdminComplaint.rejected, (state, action) => {
        state.isLoading = false;

        state.error =
          action.payload ?? 'Failed to delete complaint';
      })

      .addCase(resolveAdminComplaint.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(resolveAdminComplaint.fulfilled, (state, action) => {
        state.isLoading = false;

        if (
          state.complaint &&
          state.complaint.id === action.payload.id
        ) {
          state.complaint = action.payload;
        }

        state.complaints = state.complaints.map((complaint) =>
        complaint.id === action.payload.id
      ? {
          ...complaint,
          status: action.payload.status,
        }
        : complaint,
      );
    })

    .addCase(resolveAdminComplaint.rejected, (state, action) => {
      state.isLoading = false;

      state.error =
        action.payload ?? 'Failed to resolve complaint';
    });
  },
});

export const {
  clearAdminComplaint,
} = adminComplaintSlice.actions;

export default adminComplaintSlice.reducer;