import { configureStore } from '@reduxjs/toolkit';

import activeJobsReducer from './slices/activeJobsSlice';
import authReducer from './slices/authSlice';
import bookingReducer from './slices/bookingSlice';
import complaintReducer from './slices/complaintSlice';
import customerProfileReducer from './slices/customerProfileSlice'
import nearbyJobsReducer from './slices/nearbyJobsSlice';
import onboardingReducer from './slices/onboardingSlice';
import servicesReducer from './slices/servicesSlice';
import supportReducer from './slices/supportSlice';
import technicianProfileReducer from './slices/technicianProfileSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: servicesReducer,
    nearbyJobs: nearbyJobsReducer,
    activeJobs: activeJobsReducer,
    support: supportReducer,
    onboarding: onboardingReducer,
    customerProfile: customerProfileReducer,
    technicianProfile: technicianProfileReducer,
    booking: bookingReducer,
    complaint: complaintReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;