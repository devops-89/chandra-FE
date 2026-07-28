'use client';

import { useJobContext } from '../JobContext';
import JobStepper from './JobStepper';

export default function ProgressTracker() {
  const currentJob = useJobContext();
  const status = currentJob?.status || 'accepted';
  const statusOrder = ['accepted', 'enroute', 'arrived', 'ongoing', 'completed'];
  const currentIndex = statusOrder.indexOf(status.toLowerCase());
  const isCancelled = status.toLowerCase() === 'cancelled';
  
  let stepNumber = currentIndex >= 0 ? currentIndex + 1 : 1;
  if (isCancelled) {
    stepNumber = 0;
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold">
          Job Progress
        </h3>

        <span
          className={`
            px-3
            py-1
            rounded-full
            text-sm
            font-medium
            ${isCancelled ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}
          `}
        >
          {isCancelled ? 'Cancelled' : `Step ${stepNumber} of 5`}
        </span>
      </div>

      <JobStepper />
    </div>
  );
}