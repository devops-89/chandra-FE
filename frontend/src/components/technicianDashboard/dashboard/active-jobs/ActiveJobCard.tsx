'use client';

import ActiveJobStatus from './ActiveJobStatus';
import JobStepper from './JobStepper';
import QuickActions from './QuickActions';

export default function ActiveJobCard() {
  return (
    <div
      className="
        bg-white
        p-5 md:p-5
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
          <div className="flex items-center gap-3 mb-2">
            <h5 className="text-2xl font-bold text-slate-900">
              Full House Deep Cleaning
            </h5>

            <ActiveJobStatus status="Travelling" />
          </div>

          <p
            className="
              text-slate-500
              flex
              items-center
              gap-2
            "
          >
            <span
              className="
                material-symbols-outlined
                text-emerald-600
              "
            >
              location_on
            </span>

            Sector 52, Gurgaon, Apartment 402
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
            12 Mins
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