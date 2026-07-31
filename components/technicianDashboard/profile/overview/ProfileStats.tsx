'use client';

import { useAppSelector } from '@/redux/hooks';

export default function ProfileStats() {
  const technician = useAppSelector(
    (state) => state.technicianProfile.profile
  );

  const stats = [
    {
      label: 'Rating',
      value: technician?.overallRating ?? 'N/A',
    },
    {
      label: 'Experience',
      value: typeof technician?.technicianProfile?.yearsOfExperience === 'number'
        ? `${technician.technicianProfile.yearsOfExperience} Years`
        : 'N/A',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="
            bg-white
            border
            border-slate-200
            rounded-3xl
            p-5
            hover:shadow-lg
            shadow-sm
          "
        >
          <p className="text-sm text-slate-500">
            {stat.label}
          </p>

          <h3
            className="
              mt-3
              text-3xl
              font-bold
              text-slate-900
            "
          >
            {stat.value}
          </h3>
        </div>
      ))}
    </div>
  );
}