import { configureStore } from '@reduxjs/toolkit';

import activeJobsReducer from './slices/activeJobsSlice';
import authReducer from './slices/authSlice';
import nearbyJobsReducer from './slices/nearbyJobsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,

    nearbyJobs: nearbyJobsReducer,

    activeJobs: activeJobsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;