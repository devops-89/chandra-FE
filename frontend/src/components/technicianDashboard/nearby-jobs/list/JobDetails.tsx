'use client';

import JobMeta from './JobMeta';

interface Props {
  job: {
    serviceType: string;
    title: string;
    customerName: string;
    rating: number;
    reviews: number;
    location: string;
    distance: string;
    schedule: string;
    duration: string;
    payout: string;
    urgency: string;
  };
}

export default function JobDetails({ job }: Props) {
  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <span
          className="
            bg-emerald-100
            text-emerald-700
            text-xs
            font-semibold
            px-4
            py-2
            rounded-full
          "
        >
          {job.serviceType}
        </span>

        <span
          className={`
            px-4
            py-2
            rounded-full
            text-xs
            font-semibold

            ${
              job.urgency === 'Urgent'
                ? 'bg-red-100 text-red-600'
                : 'bg-blue-100 text-blue-600'
            }
          `}
        >
          {job.urgency}
        </span>
      </div>

      <h3
        className="
          text-2xl
          font-bold
          text-slate-900
          mb-6
        "
      >
        {job.title}
      </h3>

      <JobMeta job={job} />
    </>
  );
}