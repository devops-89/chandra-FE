import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { SUPPORT_TICKETS } from '@/constants/technicianDashboard/support/support.constants';

interface SupportState {
  tickets: typeof SUPPORT_TICKETS;

  loading: boolean;

  error: string | null;
}

const initialState: SupportState = {
  tickets: SUPPORT_TICKETS,

  loading: false,

  error: null,
};

const supportSlice = createSlice({
  name: 'support',

  initialState,

  reducers: {
    setTickets: (
      state,
      action: PayloadAction<typeof SUPPORT_TICKETS>
    ) => {
      state.tickets = action.payload;
    },

    setLoading: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.loading = action.payload;
    },

    setError: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.error = action.payload;
    },
  },
});

export const {
  setTickets,
  setLoading,
  setError,
} = supportSlice.actions;

export default supportSlice.reducer;