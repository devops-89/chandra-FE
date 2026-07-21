'use client';

import { useState } from 'react';

import TokenPaymentModal from '@/components/booking/TokenPaymentModal';
import CustomerDashboard from '@/components/customerDashboard/CustomerDashboard';
import HeroBookingCard from '@/components/customerDashboard/overview/HeroBookingCard';
import LifetimeBookingAccess from '@/components/customerDashboard/overview/LifetimeBookingAccess';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCustomerProfile } from '@/redux/slices/customerProfileSlice';

function DashboardSkeleton() {
  return (
    <div className="space-y-6 rounded-2xl border border-dashed border-slate-300 bg-white p-4 sm:rounded-3xl sm:p-6 lg:p-10">
      <div className="h-6 w-52 animate-pulse rounded-full bg-slate-200" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-xl border border-slate-100 bg-slate-100"
          />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="h-64 animate-pulse rounded-xl bg-slate-100 lg:col-span-2" />
        <div className="h-64 animate-pulse rounded-xl bg-slate-100" />
      </div>
    </div>
  );
}

export default function CustomerDashboardContent() {
  const dispatch = useAppDispatch();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const { profile, isLoading } = useAppSelector(
    (state) => state.customerProfile,
  );

  const handlePaymentSuccess = () => {
    setIsPaymentModalOpen(false);
    void dispatch(fetchCustomerProfile());
  };

  if (isLoading || !profile) {
    return <DashboardSkeleton />;
  }

  if (profile.isTokenPaid === false) {
    return (
      <>
        <LifetimeBookingAccess onUnlock={() => setIsPaymentModalOpen(true)} />
        <TokenPaymentModal
          open={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          onSuccess={handlePaymentSuccess}
          mode="lifetime"
        />
      </>
    );
  }

  return (
    <div
      className="
        space-y-6
        rounded-2xl
        border
        border-dashed
        border-slate-300
        bg-white
        p-4
        text-center
        sm:rounded-3xl
        sm:p-6
        lg:space-y-8
        lg:p-10
      "
    >
      <HeroBookingCard />
      <CustomerDashboard />
    </div>
  );
}
