'use client';

import { CalendarCheck, DollarSign, ShieldAlert, Users } from 'lucide-react';

import StatCard from './StatCard';

export default function DashboardStats() {
  const stats = [
    {
      title: 'Total Bookings',
      value: '1,284',
      icon: <CalendarCheck size={22} />,
    },
    {
      title: 'Active Technicians',
      value: '156',
      icon: <Users size={22} />,
    },
    {
      title: 'Pending Approvals',
      value: '12',
      subtitle: 'High Priority',
      priority: true,
      icon: <ShieldAlert size={22} />,
    },
    {
      title: "Today's Revenue",
      value: '₹8,420',
      icon: <DollarSign size={22} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}