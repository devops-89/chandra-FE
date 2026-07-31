'use client';

import { useJobContext } from '../JobContext';
import StepperItem from './StepperItem';

export default function JobStepper() {
  const currentJob = useJobContext();
  const status = currentJob?.status || 'accepted';
  const statusOrder = ['accepted', 'enroute', 'arrived', 'ongoing', 'completed'];
  const currentIndex = statusOrder.indexOf(status.toLowerCase());
  const isCancelled = status.toLowerCase() === 'cancelled';

  const steps = [
    {
      label: 'Accepted',
      completed: currentIndex >= 0,
      active: currentIndex === 0,
      isCancelled: isCancelled,
    },
    {
      label: 'Enroute',
      completed: currentIndex >= 1,
      active: currentIndex === 1,
    },
    {
      label: 'Arrived',
      completed: currentIndex >= 2,
      active: currentIndex === 2,
    },
    {
      label: 'Ongoing',
      completed: currentIndex >= 3,
      active: currentIndex === 3,
    },
    {
      label: 'Completed',
      completed: currentIndex >= 4,
      active: currentIndex === 4,
    },
  ];

  let progressPercent = `${currentIndex * 25}%`;
  if (isCancelled) {
    progressPercent = '0%';
  } else if (currentIndex === -1) {
    progressPercent = '0%';
  }

  return (
    <div className="relative mt-6">
      {/* Progress Line Background */}
      <div
        className="
          absolute
          top-5
          left-0
          right-0
          h-1
          bg-slate-200
          rounded-full
        "
      />

      {/* Dynamic Progress Line */}
      <div
        className={`
          absolute
          top-5
          left-0
          h-1
          rounded-full
          transition-all
          duration-300
          ${isCancelled ? 'bg-red-500' : 'bg-emerald-500'}
        `}
        style={{ width: progressPercent }}
      />

      <div className="relative flex justify-between">
        {steps.map((step, index) => (
          <StepperItem
            key={step.label}
            label={step.label}
            completed={step.completed}
            active={step.active}
            isCancelled={isCancelled && index === 0} // only show cancelled X on the first node
          />
        ))}
      </div>
    </div>
  );
}