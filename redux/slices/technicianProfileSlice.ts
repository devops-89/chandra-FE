import { TechnicianControllers } from '@/api/technicianControllers';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { TechnicianUser } from '@/types/technician/profile.types';

// ─── State ─────────────────────────────────────────────────────────────

interface TechnicianProfileState {
  profile: TechnicianUser | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: TechnicianProfileState = {
  profile: null,
  isLoading: false,
  error: null,
};

// ─── Async Thunk ───────────────────────────────────────────────────────

export const fetchTechnicianProfile = createAsyncThunk<
  TechnicianUser,
  void,
  { rejectValue: string }
>(
  'technicianProfile/fetch',
  async (_, { rejectWithValue }) => {
    try {
      return await TechnicianControllers.getTechnicianProfile();
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Failed to fetch technician profile';

      return rejectWithValue(message);
    }
  }
);

// ─── Slice ─────────────────────────────────────────────────────────────

const technicianProfileSlice = createSlice({
  name: 'technicianProfile',
  initialState,

  reducers: {
    clearTechnicianProfile(state) {
      state.profile = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ─── Fetch Technician Profile ───────────────────────────────

      .addCase(fetchTechnicianProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchTechnicianProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })

      .addCase(fetchTechnicianProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Unknown error';
      });
  },
});

// ─── Exports ───────────────────────────────────────────────────────────

export const {
  clearTechnicianProfile,
} = technicianProfileSlice.actions;

export default technicianProfileSlice.reducer;