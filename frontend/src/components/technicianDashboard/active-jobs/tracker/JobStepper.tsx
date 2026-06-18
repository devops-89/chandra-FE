'use client';

import { useAppSelector } from '@/redux/hooks';

import StepperItem from './StepperItem';

export default function JobStepper() {
  const currentJob = useAppSelector((state) => state.activeJobs.currentJob);
  const status = currentJob?.status || 'assigned';
  const statusOrder = ['assigned', 'accepted', 'travelling', 'started', 'completed'];
  const currentIndex = statusOrder.indexOf(status.toLowerCase());

  const steps = [
    {
      label: 'Assigned',
      completed: currentIndex > 0,
      active: currentIndex === 0,
    },
    {
      label: 'Accepted',
      completed: currentIndex > 1,
      active: currentIndex === 1,
    },
    {
      label: 'Travelling',
      completed: currentIndex > 2,
      active: currentIndex === 2,
    },
    {
      label: 'Started',
      completed: currentIndex > 3,
      active: currentIndex === 3,
    },
    {
      label: 'Completed',
      completed: currentIndex === 4,
      active: currentIndex === 4,
    },
  ];

  const progressPercent = `${currentIndex * 25}%`;

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
        className="
          absolute
          top-5
          left-0
          h-1
          bg-emerald-500
          rounded-full
          transition-all
          duration-300
        "
        style={{ width: progressPercent }}
      />

      <div className="relative flex justify-between">
        {steps.map((step) => (
          <StepperItem
            key={step.label}
            label={step.label}
            completed={step.completed}
            active={step.active}
          />
        ))}
      </div>
    </div>
  );
}