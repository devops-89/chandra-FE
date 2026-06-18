import type { RootState } from '@/redux/store';

export const selectSupportTickets = (
  state: RootState
) => state.support.tickets;

export const selectSupportLoading = (
  state: RootState
) => state.support.loading;

export const selectSupportError = (
  state: RootState
) => state.support.error;