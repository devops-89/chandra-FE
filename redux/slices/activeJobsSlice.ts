import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { MOCK_ACTIVE_JOB } from '@/constants/technicianDashboard/active-jobs/activeJob.constants';
import type { ActiveJob } from '@/types/technicianDashboard/activeJobs.types';

interface ActiveJobsState {
  currentJob: ActiveJob | null;

  loading: boolean;

  error: string | null;
}

const initialState: ActiveJobsState = {
  currentJob: MOCK_ACTIVE_JOB,

  loading: false,

  error: null,
};

const activeJobsSlice = createSlice({
  name: 'activeJobs',

  initialState,

  reducers: {
    setCurrentJob: (
      state,
      action: PayloadAction<ActiveJob | null>
    ) => {
      state.currentJob = action.payload;
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
  setCurrentJob,
  setLoading,
  setError,
} = activeJobsSlice.actions;

export default activeJobsSlice.reducer;