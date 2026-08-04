'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { BookingControllers } from '@/api/bookingControllers';

import StatCard from './StatCard';

export default function StatsGrid() {
  const router = useRouter();

  const [earnings, setEarnings] = useState({
    todayEarnings: 0,
    walletBalance: 0,
  });

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const res = await BookingControllers.getPayoutStats();
        if (res?.data?.data) {
          setEarnings({
            todayEarnings: res.data.data.thisWeekPayout || 0,
            walletBalance: res.data.data.totalEarning || 0,
          });
        }
      } catch (error) {
        console.error('Error fetching dashboard earnings:', error);
      }
    };
    fetchEarnings();
  }, []);

  const [apiStats, setApiStats] = useState({
    availableServices: 0,
    activeServices: 0,
  });

  useEffect(() => {
    const fetchApiStats = async () => {
      try {
        const available = await BookingControllers.getTechnicianActiveBookings();
        let availableCount = 0;
        if (available?.data?.data) {
          availableCount = Array.isArray(available.data.data) ? available.data.data.length : available.data.total || 0;
        }

        const activeAccepted = await BookingControllers.getAssignedBookings(1, 1, 'ACCEPTED');
        let activeCount = 0;
        if (activeAccepted?.data?.data && activeAccepted.data.data.length > 0) {
          activeCount = 1;
        } else {
          const activeCompleted = await BookingControllers.getAssignedBookings(1, 1, 'COMPLETED');
          if (activeCompleted?.data?.data && activeCompleted.data.data.length > 0) {
            activeCount = 1;
          }
        }

        setApiStats({
          availableServices: availableCount,
          activeServices: activeCount,
        });
      } catch (error) {
        console.error('Error fetching dashboard counts:', error);
      }
    };
    fetchApiStats();

    const handleRefresh = () => fetchApiStats();
    window.addEventListener('refresh_bookings', handleRefresh);
    return () => window.removeEventListener('refresh_bookings', handleRefresh);
  }, []);

  const stats: Array<{ icon: string; title: string; value: string; badge?: string; actionText?: string; onClick: () => void }> = [
    {
      icon: 'search',
      title: 'Available Bookings',
      value: String(apiStats.availableServices),
      onClick: () => router.push('/technician/dashboard'),
    },
    {
      icon: 'pending_actions',
      title: 'Active Bookings',
      value: String(apiStats.activeServices),
      onClick: () => router.push('/technician/bookings'),
    },
    {
      icon: 'payments',
      title: "This Week's Earnings",
      value: `₹${earnings.todayEarnings.toLocaleString('en-IN')}`,
      onClick: () => router.push('/technician/earnings'),
    },
    {
      icon: 'account_balance_wallet',
      title: 'Total Earnings',
      value: `₹${earnings.walletBalance.toLocaleString('en-IN')}`,
      onClick: () => router.push('/technician/earnings'),
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