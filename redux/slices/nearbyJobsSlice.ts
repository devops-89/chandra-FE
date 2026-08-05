import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { MOCK_NEARBY_JOBS } from '@/constants/technicianDashboard/nearby-jobs/nearbyJobs.constants';
import type {
  NearbyJob,
  NearbyJobsState,
} from '@/types/technicianDashboard/nearbyJobs.types';

const initialState: NearbyJobsState = {
  jobs: MOCK_NEARBY_JOBS,

  selectedJob: null,

  filters: {
    serviceType: '',
    distance: '',
    payout: '',
    schedule: '',
  },

  loading: false,

  error: null,
};

const nearbyJobsSlice = createSlice({
  name: 'nearbyJobs',

  initialState,

  reducers: {
    setJobs: (
      state,
      action: PayloadAction<NearbyJob[]>
    ) => {
      state.jobs = action.payload;
    },

    addJob: (
      state,
      action: PayloadAction<NearbyJob>
    ) => {
      state.jobs.unshift(action.payload);
    },

    selectJob: (
      state,
      action: PayloadAction<NearbyJob>
    ) => {
      state.selectedJob = action.payload;
    },

    clearSelectedJob: (state) => {
      state.selectedJob = null;
    },

    setServiceTypeFilter: (
      state,
      action: PayloadAction<string>
    ) => {
      state.filters.serviceType = action.payload;
    },

    setDistanceFilter: (
      state,
      action: PayloadAction<string>
    ) => {
      state.filters.distance = action.payload;
    },

    setPayoutFilter: (
      state,
      action: PayloadAction<string>
    ) => {
      state.filters.payout = action.payload;
    },

    setScheduleFilter: (
      state,
      action: PayloadAction<string>
    ) => {
      state.filters.schedule = action.payload;
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
  setJobs,
  addJob,
  selectJob,
  clearSelectedJob,
  setServiceTypeFilter,
  setDistanceFilter,
  setPayoutFilter,
  setScheduleFilter,
  setLoading,
  setError,
} = nearbyJobsSlice.actions;

export default nearbyJobsSlice.reducer;