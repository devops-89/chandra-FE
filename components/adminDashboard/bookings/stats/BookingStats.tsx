'use client';

import { useEffect, useState } from 'react';
import { AdminControllers } from '@/api/adminControllers';
import BookingStatusCards from './BookingStatusCards';

const BookingStats = () => {
  const [stats, setStats] = useState({
    pending: 0,
    assigned: 0,
    inProgress: 0,
    completed: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [pending, assigned, inProgress, completed] = await Promise.all([
          AdminControllers.getAdminBookings(1, 1, 'PENDING'),
          AdminControllers.getAdminBookings(1, 1, 'ASSIGNED'),
          AdminControllers.getAdminBookings(1, 1, 'IN_PROGRESS'),
          AdminControllers.getAdminBookings(1, 1, 'COMPLETED'),
        ]);

        setStats({
          pending: pending.pagination.total || 0,
          assigned: assigned.pagination.total || 0,
          inProgress: inProgress.pagination.total || 0,
          completed: completed.pagination.total || 0,
        });
      } catch (error) {
        console.error('Failed to fetch booking stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
      <BookingStatusCards title="Pending" value={stats.pending} color="text-slate-950" />
      <BookingStatusCards title="Assigned" value={stats.assigned} color="text-slate-950" />
      <BookingStatusCards title="In Progress" value={stats.inProgress} color="text-emerald-600" />
      <BookingStatusCards title="Completed" value={stats.completed} color="text-slate-950" />
    </div>
  );
};

export default BookingStats;
