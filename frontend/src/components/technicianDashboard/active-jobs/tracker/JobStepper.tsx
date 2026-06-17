'use client';

import StepperItem from './StepperItem';

const steps = [
  {
    label: 'Assigned',
    completed: true,
  },

  {
    label: 'Accepted',
    completed: true,
  },

  {
    label: 'Travelling',
    active: true,
  },

  {
    label: 'Started',
  },

  {
    label: 'Completed',
  },
];

export default function JobStepper() {
  return (
    <div className="relative mt-6">
      {/* Progress Line */}
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

      <div
        className="
          absolute
          top-5
          left-0
          w-[60%]
          h-1
          bg-emerald-500
          rounded-full
        "
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