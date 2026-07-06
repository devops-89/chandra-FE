import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { createComplaintService, updateComplaintService } from '@/services/complaint.service';
import type {
  Complaint,
  CreateComplaintRequest,
  UpdateComplaintRequest,
} from '@/types/complaint.types';

interface ComplaintState {
  complaint: Complaint | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ComplaintState = {
  complaint: null,
  isLoading: false,
  error: null,
};

export const createComplaint = createAsyncThunk<
  Complaint,
  CreateComplaintRequest,
  { rejectValue: string }
>(
  'complaint/create',

  async (payload, { rejectWithValue }) => {
    try {
      return await createComplaintService(payload);
    } catch (err) {
      return rejectWithValue(
        err instanceof Error
          ? err.message
          : 'Failed to create complaint'
      );
    }
  }
);

export const updateComplaint = createAsyncThunk<
  Complaint,
  UpdateComplaintRequest,
  { rejectValue: string }
>(
  'complaint/update',

  async (payload, { rejectWithValue }) => {
    try {
      return await updateComplaintService(payload);
    } catch (err) {
      return rejectWithValue(
        err instanceof Error
          ? err.message
          : 'Failed to update complaint'
      );
    }
  }
);

const complaintSlice = createSlice({
  name: 'complaint',

  initialState,

  reducers: {
    clearComplaint(state) {
      state.complaint = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(createComplaint.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(createComplaint.fulfilled, (state, action) => {
        state.isLoading = false;
        state.complaint = action.payload;
      })

      .addCase(createComplaint.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Unknown error';
      })
      .addCase(updateComplaint.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(updateComplaint.fulfilled, (state, action) => {
        state.isLoading = false;
        state.complaint = action.payload;
      })

      .addCase(updateComplaint.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
        action.payload ?? 'Unknown error';
      });
  },
});

export const {
  clearComplaint,
} = complaintSlice.actions;

export default complaintSlice.reducer;