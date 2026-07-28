'use client';

import DashboardLayout from '@/components/customerDashboard/layout/DashboardLayout';
import Profile from '@/components/customerDashboard/profile/Profile';

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <Profile />
    </DashboardLayout>
  );
}