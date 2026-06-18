'use client';

import Link from 'next/link';

import { useAppSelector } from '@/redux/hooks';

import ActiveJobStatus from './ActiveJobStatus';
import JobStepper from './JobStepper';
import QuickActions from './QuickActions';

export default function ActiveJobCard() {
  const currentJob = useAppSelector((state) => state.activeJobs.currentJob);

  if (!currentJob) {
    return (
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center py-12">
        <span className="material-symbols-outlined text-slate-350 text-5xl mb-3">work_history</span>
        <h5 className="text-xl font-bold text-slate-900 mb-2">No Active Job</h5>
        <p className="text-slate-500 text-sm max-w-xs mx-auto mb-6 leading-relaxed">
          You don&apost have any active jobs currently assigned. Browse nearby requests to start earning!
        </p>
        <Link
          href="/dashboard/technician/nearby-jobs"
          className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors text-sm cursor-pointer"
        >
          Browse Nearby Jobs
        </Link>
      </div>
    );
  }

  // Capitalize status
  const formattedStatus = currentJob.status.charAt(0).toUpperCase() + currentJob.status.slice(1);

  return (
    <div
      className="
        bg-white
        p-5 md:p-6
        rounded-xl
        border-l-8
        border-emerald-600
        shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)]
        relative
        overflow-hidden
      "
    >
      {/* Background Decoration */}
      <div
        className="
          absolute
          right-0
          top-0
          w-24
          h-24
          bg-emerald-600/5
          rounded-full
          -translate-y-1/2
          translate-x-1/2
        "
      />

      {/* Header */}
      <div
        className="
          flex
          flex-col
          md:flex-row
          justify-between
          items-start
          gap-4
          mb-8
          relative
          z-10
        "
      >
        <div>
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h5 className="text-2xl font-bold text-slate-900">
              {currentJob.serviceType}
            </h5>

            <ActiveJobStatus status={formattedStatus} />
          </div>

          <p
            className="
              text-slate-500
              flex
              items-center
              gap-2
              text-sm
            "
          >
            <span
              className="material-symbols-outlined text-emerald-600 text-[18px]"
            >
              location_on
            </span>

            {currentJob.address}
          </p>
        </div>

        <div className="text-right">
          <p className="text-slate-500 text-sm">
            ETA
          </p>

          <p
            className="
              text-2xl
              font-extrabold
              text-emerald-600
            "
          >
            {currentJob.status === 'completed' ? 'Done' : currentJob.eta}
          </p>
        </div>
      </div>

      {/* Stepper */}
      <div className="mb-8">
        <JobStepper />
      </div>

      {/* Actions */}
      <QuickActions />
    </div>
  );
}