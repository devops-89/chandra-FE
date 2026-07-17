import { configureStore } from '@reduxjs/toolkit';

import activeJobsReducer from './slices/activeJobsSlice';
import adminBookingReducer from './slices/adminBookingSlice';
import adminComplaintReducer from './slices/adminComplaintSlice';
import authReducer from './slices/authSlice';
import bookingReducer from './slices/bookingSlice';
import complaintReducer from './slices/complaintSlice';
import customerBookingsReducer from './slices/customerBookingSlice';
import customerDashboardReducer from './slices/customerDashboardSlice';
import customerProfileReducer from './slices/customerProfileSlice';
import tokenPaymentReducer from './slices/customerTokenPaymentSlice';
import favouriteTechnicianReducer from './slices/favouriteTechnicianSlice';
import forgotPasswordReducer from './slices/forgotPasswordSlice'
import nearbyJobsReducer from './slices/nearbyJobsSlice';
import onboardingReducer from './slices/onboardingSlice';
import servicesReducer from './slices/servicesSlice';
import supportReducer from './slices/supportSlice';
import technicianProfileReducer from './slices/technicianProfileSlice';
import { setAppStore } from './storeAccessor';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    forgotPassword: forgotPasswordReducer,
    services: servicesReducer,
    nearbyJobs: nearbyJobsReducer,
    activeJobs: activeJobsReducer,
    support: supportReducer,
    onboarding: onboardingReducer,
    customerProfile: customerProfileReducer,
    technicianProfile: technicianProfileReducer,
    booking: bookingReducer,
    complaint: complaintReducer,
    customerBookings: customerBookingsReducer,
    adminComplaint: adminComplaintReducer,
    adminBookings: adminBookingReducer,
    customerDashboard: customerDashboardReducer,
    favouriteTechnicians: favouriteTechnicianReducer,
    tokenPayment: tokenPaymentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

setAppStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;