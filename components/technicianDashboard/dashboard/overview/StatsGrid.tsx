'use client';

import { useRouter } from 'next/navigation';

import { useTechnicianData } from '@/components/technicianDashboard/utils/state';
import { useAppSelector } from '@/redux/hooks';
import { selectNearbyJobs } from '@/redux/selectors/nearbyJobsSelectors';

import StatCard from './StatCard';

export default function StatsGrid() {
  const router = useRouter();
  const { wallet } = useTechnicianData();
  const nearbyJobs = useAppSelector(selectNearbyJobs);
  const activeJob = useAppSelector((state) => state.activeJobs.currentJob);

  const stats = [
    {
      icon: 'search',
      title: 'Available Jobs',
      value: String(nearbyJobs.length),
      badge: nearbyJobs.length > 0 ? `+${nearbyJobs.length} new` : undefined,
      onClick: () => router.push('/dashboard/technician/nearby-jobs'),
    },
    {
      icon: 'pending_actions',
      title: 'Active Jobs',
      value: activeJob ? '1' : '0',
      onClick: () => router.push('/dashboard/technician/bookings'),
    },
    {
      icon: 'payments',
      title: "Today's Earnings",
      value: `₹${wallet.todayEarnings.toLocaleString('en-IN')}`,
      onClick: () => router.push('/dashboard/technician/earnings'),
    },
    {
      icon: 'account_balance_wallet',
      title: 'Wallet Balance',
      value: `₹${wallet.balance.toLocaleString('en-IN')}`,
      actionText: 'Withdraw',
      onClick: () => router.push('/dashboard/technician/earnings'),
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 md:gap-6">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          icon={stat.icon}
          title={stat.title}
          value={stat.value}
          badge={stat.badge}
          actionText={stat.actionText}
          onClick={stat.onClick}
        />
      ))}
    </div>
  );
}