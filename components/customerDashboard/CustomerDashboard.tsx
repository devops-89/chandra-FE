'use client';

import { Box, CircularProgress, Typography } from '@mui/material';
import { useEffect } from 'react';

import ActiveBookingCard from '@/components/customerDashboard/activeBooking/ActiveBookingCard';
import SavedAddressesWidget from '@/components/customerDashboard/addresses/SavedAddressesWidget';
import HeroBookingCard from '@/components/customerDashboard/overview/HeroBookingCard';
import ProfileSummaryWidget from '@/components/customerDashboard/profile/ProfileSummaryWidget';
import ServicesWidget from '@/components/customerDashboard/services/ServicesWidget';
import { useActiveBooking } from "@/hooks/useActiveBooking";
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCustomerDashboardStats } from '@/redux/slices/customerDashboardSlice';
import { fetchCustomerAddresses,fetchCustomerProfile } from '@/redux/slices/customerProfileSlice';
import { fetchServices } from '@/redux/slices/servicesSlice';

export default function CustomerDashboard() {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(fetchCustomerDashboardStats());
    dispatch(fetchCustomerProfile());
    dispatch(fetchCustomerAddresses());
    dispatch(fetchServices({ status: true }));
  }, [dispatch]);

  const { isLoading: statsLoading } = useAppSelector((state) => state.customerDashboard);
  const { isLoading: profileLoading } = useAppSelector((state) => state.customerProfile);
  const { isLoading: servicesLoading } = useAppSelector((state) => state.services);
  
  const { activeBooking, loading: activeBookingLoading } = useActiveBooking();

  const isAnyLoading = statsLoading || profileLoading || servicesLoading || activeBookingLoading;

  if (isAnyLoading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '60vh', gap: 2 }}>
        <CircularProgress color="success" size={40} />
        <Typography variant="subtitle1" color="text.secondary">
          Loading dashboard...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, md: 4 } }}>
      <HeroBookingCard />

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 3, md: 4 }, alignItems: 'stretch' }}>
        {/* Main Column - Active Booking */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, md: 4 }, width: { xs: '100%', md: '58.333%', lg: '66.666%' } }}>
          <ServicesWidget />
          <ActiveBookingCard activeBooking={activeBooking} />
        </Box>

        {/* Side Column - Profile, Addresses */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, md: 4 }, width: { xs: '100%', md: '41.666%', lg: '33.333%' } }}>
          <Box sx={{ flex: 1 }}>
            <ProfileSummaryWidget />
          </Box>
          <Box sx={{ flex: 1 }}>
            <SavedAddressesWidget />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
