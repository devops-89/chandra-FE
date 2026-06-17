'use client';

import JobStepper from './JobStepper';

export default function ProgressTracker() {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold">
          Job Progress
        </h3>

        <span
          className="
            bg-emerald-100
            text-emerald-700
            px-3
            py-1
            rounded-full
            text-sm
            font-medium
          "
        >
          Step 3 of 5
        </span>
      </div>

      <JobStepper />
    </div>
  );
}