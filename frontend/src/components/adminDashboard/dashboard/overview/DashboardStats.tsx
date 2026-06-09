'use client';

import BookOnlineIcon from '@mui/icons-material/BookOnline';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PaymentsIcon from '@mui/icons-material/Payments';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

import StatCard from './StatCard';

export default function DashboardStats() {
  const stats = [
    {
      title: 'Total Bookings',
      value: '1,284',
      icon: <BookOnlineIcon />,
    },
    {
      title: 'Active Technicians',
      value: '156',
      icon: <EngineeringIcon />,
    },
    {
      title: 'Pending Approvals',
      value: '12',
      subtitle: 'High Priority',
      priority: true,
      icon: <VerifiedUserIcon />,
    },
    {
      title: "Today's Revenue",
      value: '$8,420',
      icon: <PaymentsIcon />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          {...stat}
        />
      ))}
    </div>
  );
}