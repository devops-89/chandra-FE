'use client';

import JobActions from './JobActions';

interface JobCardProps {
  serviceType: string;
  customerName: string;
  distance: string;
  payout: string;
  time: string;
  variant?: 'green' | 'blue';
  onAccept?: () => void;
  onReject?: () => void;
  isAccepting?: boolean;
}

export default function JobCard({
  serviceType,
  customerName,
  distance,
  payout,
  time,
  variant = 'green',
  onAccept,
  onReject,
  isAccepting,
}: JobCardProps) {
  return (
    <div
      className="
        bg-surface-white
        p-5
        md:p-6
        rounded-2xl
        border
        border-slate-200/80
        hover:border-emerald-500/40
        hover:shadow-md
        transition-all
        duration-300
        ease-in-out
        flex
        flex-col
        justify-between
      "
      role="region"
      aria-label={`Job offer for ${customerName}`}
    >
      <div>
        <div className="flex justify-between items-center mb-4">
          <span
            className={`
              px-3
              py-1
              rounded-full
              text-xs
              font-semibold
              tracking-wide
              ${
                variant === 'green'
                  ? 'bg-emerald-100/70 text-emerald-800'
                  : 'bg-blue-100/70 text-blue-800'
              }
            `}
          >
            {serviceType}
          </span>

          <span className="text-slate-500 text-xs md:text-sm flex items-center gap-1.5 font-medium">
            <span className="material-symbols-outlined text-base md:text-lg text-slate-400" aria-hidden="true">
              schedule
            </span>
            {time}
          </span>
        </div>

        <h5 className="font-bold text-lg text-slate-900 mb-1.5 tracking-tight">
          {customerName}
        </h5>

        <p className="text-slate-500 text-sm mb-5 flex items-center gap-1.5 font-medium">
          <span className="material-symbols-outlined text-lg text-slate-400" aria-hidden="true">
            near_me
          </span>
          {distance}
        </p>
      </div>

      <div>
        <div
          className="
            flex
            items-center
            justify-between
            py-3.5
            border-y
            border-slate-150/70
            mb-5
          "
        >
          <span className="text-slate-400 uppercase text-xs font-bold tracking-wider">
            Estimated Payout
          </span>

          <span className="text-xl font-extrabold text-emerald-700">
            {payout}
          </span>
        </div>

        <JobActions onAccept={onAccept} onReject={onReject} isAccepting={isAccepting} />
      </div>
    </div>
  );
}