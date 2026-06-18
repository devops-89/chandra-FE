'use client';

import { useAppSelector } from '@/redux/hooks';

import JobStepper from './JobStepper';

export default function ProgressTracker() {
  const currentJob = useAppSelector((state) => state.activeJobs.currentJob);
  const status = currentJob?.status || 'assigned';
  const statusOrder = ['assigned', 'accepted', 'travelling', 'started', 'completed'];
  const currentIndex = statusOrder.indexOf(status.toLowerCase());
  const stepNumber = currentIndex >= 0 ? currentIndex + 1 : 1;

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
          Step {stepNumber} of 5
        </span>
      </div>

      <JobStepper />
    </div>
  );
}