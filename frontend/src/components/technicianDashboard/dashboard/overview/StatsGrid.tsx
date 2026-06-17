'use client';

import StatCard from './StatCard';

const stats = [
  {
    icon: 'search',
    title: 'Available Jobs',
    value: '12',
    badge: '+2 new',
  },

  {
    icon: 'pending_actions',
    title: 'Active Jobs',
    value: '2',
  },

  {
    icon: 'payments',
    title: "Today's Earnings",
    value: '₹1,450',
  },

  {
    icon: 'account_balance_wallet',
    title: 'Wallet Balance',
    value: '₹8,200',
    actionText: 'Withdraw',
  },
];

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          icon={stat.icon}
          title={stat.title}
          value={stat.value}
          badge={stat.badge}
          actionText={stat.actionText}
        />
      ))}
    </div>
  );
}