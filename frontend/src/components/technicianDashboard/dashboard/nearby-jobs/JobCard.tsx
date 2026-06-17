'use client';

import JobActions from './JobActions';

interface JobCardProps {
  serviceType: string;
  customerName: string;
  distance: string;
  payout: string;
  time: string;
  variant?: 'green' | 'blue';
}

export default function JobCard({
  serviceType,
  customerName,
  distance,
  payout,
  time,
  variant = 'green',
}: JobCardProps) {
  return (
    <div
      className="
        bg-white
        p-4
        md:p-6
        rounded-xl
        border
        border-slate-200
        shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)]
        hover:border-emerald-300
        transition-all
      "
    >
      <div className="flex justify-between items-start mb-4">
        <span
          className={`
            px-3 py-1
            rounded-full
            text-xs md:text-sm
            ${
              variant === 'green'
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-blue-100 text-blue-700'
            }
          `}
        >
          {serviceType}
        </span>

        <span className="text-slate-500 text-sm flex items-center gap-1">
          <span className="material-symbols-outlined text-base">
            schedule
          </span>
          {time}
        </span>
      </div>

      <h5 className="font-semibold text-lg mb-1">
        {customerName}
      </h5>

      <p className="text-slate-500 mb-4 flex items-center gap-1">
        <span className="material-symbols-outlined">
          near_me
        </span>
        {distance}
      </p>

      <div
        className="
          flex
          items-center
          justify-between
          py-4
          border-y
          border-slate-200
          mb-6
        "
      >
        <span className="text-slate-500 uppercase text-xs">
          Payout
        </span>

        <span className="text-xl font-bold text-emerald-600">
          {payout}
        </span>
      </div>

      <JobActions />
    </div>
  );
}