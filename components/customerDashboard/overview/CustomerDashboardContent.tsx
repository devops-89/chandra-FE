'use client';


import CustomerDashboard from '@/components/customerDashboard/CustomerDashboard';
import HeroBookingCard from '@/components/customerDashboard/overview/HeroBookingCard';
import { useAppSelector } from '@/redux/hooks';

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

  const { profile, isLoading } = useAppSelector(
    (state) => state.customerProfile,
  );

  if (isLoading || !profile) {
    return <DashboardSkeleton />;
  }

  return (
    <div
      className="
        space-y-6
        rounded-2xl
        text-center
      "
    >
      <HeroBookingCard />
      <CustomerDashboard />
    </div>
  );
}
