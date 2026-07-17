import type { RootState } from '../store';

export const selectCurrentJob = (
  state: RootState
) => state.activeJobs.currentJob;

export const selectActiveJobLoading = (
  state: RootState
) => state.activeJobs.loading;

export const selectActiveJobError = (
  state: RootState
) => state.activeJobs.error;