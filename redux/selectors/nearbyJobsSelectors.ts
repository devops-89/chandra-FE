import type { RootState } from '../store';

export const selectNearbyJobs = (
  state: RootState
) => state.nearbyJobs.jobs;

export const selectSelectedJob = (
  state: RootState
) => state.nearbyJobs.selectedJob;

export const selectNearbyJobsLoading = (
  state: RootState
) => state.nearbyJobs.loading;

export const selectNearbyJobsError = (
  state: RootState
) => state.nearbyJobs.error;

export const selectNearbyJobsFilters = (
  state: RootState
) => state.nearbyJobs.filters;