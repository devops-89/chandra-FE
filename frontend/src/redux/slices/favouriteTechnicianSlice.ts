import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import { getFavouriteTechniciansService } from '@/services/favouriteTechnician.service';
import type { FavouriteTechnician } from '@/types/customer/favouriteTechnician.types';

interface FavouriteTechnicianState {
  technicians: FavouriteTechnician[];

  isLoading: boolean;

  error: string | null;
}

const initialState: FavouriteTechnicianState = {
  technicians: [],

  isLoading: false,

  error: null,
};

export const fetchFavouriteTechnicians =
  createAsyncThunk<
    FavouriteTechnician[],
    void,
    { rejectValue: string }
  >(
    'favouriteTechnicians/fetch',

    async (_, { rejectWithValue }) => {
      try {
        return await getFavouriteTechniciansService();
      } catch (err) {
        return rejectWithValue(
          err instanceof Error
            ? err.message
            : 'Failed to fetch favourite technicians',
        );
      }
    },
  );

const favouriteTechnicianSlice = createSlice({
  name: 'favouriteTechnicians',

  initialState,

  reducers: {
    clearFavouriteTechnicians(state) {
      state.technicians = [];
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(
        fetchFavouriteTechnicians.pending,
        (state) => {
          state.isLoading = true;
          state.error = null;
        },
      )

      .addCase(
        fetchFavouriteTechnicians.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.technicians = action.payload;
        },
      )

      .addCase(
        fetchFavouriteTechnicians.rejected,
        (state, action) => {
          state.isLoading = false;

          state.error =
            action.payload ??
            'Failed to fetch favourite technicians';
        },
      );
  },
});

export const {
  clearFavouriteTechnicians,
} = favouriteTechnicianSlice.actions;

export default favouriteTechnicianSlice.reducer;