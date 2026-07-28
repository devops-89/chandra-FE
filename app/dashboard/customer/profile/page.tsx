'use client';

import { useEffect } from 'react';

import DashboardLayout from '@/components/customerDashboard/layout/DashboardLayout';
// import ChangePasswordCard from '@/components/customerDashboard/profile/ChangePasswordCard';
import ProfileForm from '@/components/customerDashboard/profile/ProfileForm';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCustomerProfile } from '@/redux/slices/customerProfileSlice';

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.customerProfile.profile);

  useEffect(() => {
    // Only fetch if not already loaded — prevents duplicate API call when
    // DashboardSidebar has already fetched it on this session.
    if (!profile) {
      dispatch(fetchCustomerProfile());
    }
  }, [dispatch, profile]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Profile
          </h1>

          <p className="text-slate-500 mt-1">
            Manage your account information.
          </p>
        </div>
        <ProfileForm />
        {/* <ChangePasswordCard /> */}
      </div>
    </DashboardLayout>
  );
}