'use client';

import { useState, useEffect } from 'react';
import StatCard from './StatCard';
import { BookingControllers } from '@/api/bookingControllers';

export default function StatsGrid() {
  const [stats, setStats] = useState({
    totalEarning: 0,
    thisMonthPayout: 0,
    thisWeekPayout: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await BookingControllers.getPayoutStats();
        if (res?.data?.data) {
          setStats({
            totalEarning: res.data.data.totalEarning || 0,
            thisMonthPayout: res.data.data.thisMonthPayout || 0,
            thisWeekPayout: res.data.data.thisWeekPayout || 0,
          });
        }
      } catch (error) {
        console.error('Error fetching payout stats:', error);
      }
    };
    fetchStats();
  }, []);

  const displayStats = [
    {
      title: 'Total Earnings',
      value: `₹${stats.totalEarning}`,
      change: 'Overall',
    },
    {
      title: 'This Month',
      value: `₹${stats.thisMonthPayout}`,
      change: 'Monthly',
    },
    {
      title: 'This Week',
      value: `₹${stats.thisWeekPayout}`,
      change: 'Weekly',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {displayStats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          change={stat.change}
        />
      ))}
    </div>
  );
}