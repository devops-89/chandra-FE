'use client';

import { CalendarCheck, DollarSign, ShieldAlert, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

import { AdminControllers } from '@/api/adminControllers';
import StatCard from './StatCard';

export default function DashboardStats() {
  const [totalBookings, setTotalBookings] = useState(0);
  const [activeTechnicians, setActiveTechnicians] = useState(0);
  const [pendingApprovals, setPendingApprovals] = useState(0);
  const [todaysRevenue, setTodaysRevenue] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [bookingsRes, activeTechs, pendingTechs] = await Promise.all([
          AdminControllers.getAdminBookings(1, 1000),
          AdminControllers.getAllTechnicians(),
          AdminControllers.getPendingTechnicians()
        ]);
        
        setTotalBookings(bookingsRes.pagination.total);
        setActiveTechnicians(activeTechs.length);
        setPendingApprovals(pendingTechs.length);
        
        // Calculate today's revenue from completed bookings
        const today = new Date().toISOString().split('T')[0];
        const revenue = bookingsRes.bookings.reduce((sum: number, b: any) => {
          if (b.status === 'COMPLETED' && b.createdAt.startsWith(today)) {
             return sum + (Number(b.priceBreakdown?.platformEarning) || 0);
          }
          return sum;
        }, 0);
        
        setTodaysRevenue(revenue);
      } catch (err) {
        console.error('Failed to fetch dashboard stats:', err);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    {
      title: 'Total Bookings',
      value: totalBookings.toLocaleString(),
      icon: <CalendarCheck size={22} />,
    },
    {
      title: 'Active Technicians',
      value: activeTechnicians.toLocaleString(),
      icon: <Users size={22} />,
    },
    {
      title: 'Pending Approvals',
      value: pendingApprovals.toLocaleString(),
      subtitle: pendingApprovals > 0 ? 'High Priority' : 'All clear',
      priority: pendingApprovals > 0,
      icon: <ShieldAlert size={22} />,
    },
    {
      title: "Today's Revenue",
      value: `₹${todaysRevenue.toLocaleString()}`,
      icon: <DollarSign size={22} />,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4 xl:gap-6">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}
