'use client';

import StatCard from './StatCard';

const stats = [
  {
    title: 'Total Earnings',
    value: '₹84,500',
    change: '+12%',
  },

  {
    title: 'This Month',
    value: '₹18,250',
    change: '+8%',
  },

  {
    title: 'This Week',
    value: '₹4,850',
    change: '+5%',
  },

  {
    title: 'Wallet Balance',
    value: '₹12,600',
    change: 'Available',
  },
];

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
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