<<<<<<< HEAD
'use client';

import { useEffect, useState } from 'react';
import { AdminControllers } from '@/api/adminControllers';
import BookingStatusCards from './BookingStatusCards';
=======
import { CalendarClock, CheckCircle2, ClipboardList, UserCheck } from 'lucide-react';

import BookingStatusCards from "./BookingStatusCards";
>>>>>>> 6ef5b5b16643698aaf05ebcb75447ba4abb80b76

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
<<<<<<< HEAD
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
      <BookingStatusCards title="Pending" value={stats.pending} color="text-slate-950" />
      <BookingStatusCards title="Assigned" value={stats.assigned} color="text-slate-950" />
      <BookingStatusCards title="In Progress" value={stats.inProgress} color="text-emerald-600" />
      <BookingStatusCards title="Completed" value={stats.completed} color="text-slate-950" />
=======
    <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4 xl:gap-6">
      <BookingStatusCards
        title="Pending"
        value={23}
        color="text-slate-950"
        icon={<ClipboardList size={22} />}
        iconClassName="bg-amber-100 text-amber-700"
      />
      <BookingStatusCards
        title="Assigned"
        value={48}
        color="text-slate-950"
        icon={<UserCheck size={22} />}
        iconClassName="bg-sky-100 text-sky-700"
      />
      <BookingStatusCards
        title="In Progress"
        value={18}
        color="text-emerald-600"
        icon={<CalendarClock size={22} />}
        iconClassName="bg-emerald-100 text-emerald-700"
      />
      <BookingStatusCards
        title="Completed"
        value={542}
        color="text-slate-950"
        icon={<CheckCircle2 size={22} />}
        iconClassName="bg-emerald-100 text-emerald-700"
      />
>>>>>>> 6ef5b5b16643698aaf05ebcb75447ba4abb80b76
    </div>
  );
};

export default BookingStats;
