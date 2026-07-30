'use client';

import { motion } from 'framer-motion';
import { Bike, Check, Home, Play } from 'lucide-react';

import type { BookingProgressStatus } from '@/types/dashboardTypes/customerDashboard/customerDashboard.types';

//
type ProgressStep = {
  id: BookingProgressStatus;
  label: string;
  status: 'completed' | 'active' | 'pending';
};

type BookingProgressTrackerProps = {
  status: BookingProgressStatus;
};

const STEP_ORDER: BookingProgressStatus[] = [
  'booked',
  'assigned',
  'on-way',
  'started',
  'completed',
];

const getSteps = (
  currentStatus: BookingProgressStatus,
): ProgressStep[] => {
  const labels: Record<BookingProgressStatus, string> = {
    booked: 'Booked',
    assigned: 'Assigned',
    'on-way': 'On The Way',
    started: 'Started',
    completed: 'Completed',
  };

  const currentIndex =
    STEP_ORDER.indexOf(currentStatus);

  return STEP_ORDER.map((id, index) => ({
    id,
    label: labels[id],
    status:
      index < currentIndex
        ? 'completed'
        : index === currentIndex
          ? 'active'
          : 'pending',
  }));
};

const StepIcon = ({
  step,
}: {
  step: ProgressStep;
}) => {
  const iconClass = 'h-7 w-7';

  if (step.id === 'booked') {
    return <Check className={iconClass} />;
  }

  if (step.id === 'assigned') {
    return <Check className={iconClass} />;
  }

  if (step.id === 'on-way') {
    return <Bike className={iconClass} />;
  }

  if (step.id === 'started') {
    return <Play className={iconClass} />;
  }

  return <Home className={iconClass} />;
};

const BookingProgressTracker = ({
  status,
}: BookingProgressTrackerProps) => {
  const steps = getSteps(status);

  const currentStepIndex = steps.findIndex(
    (step) => step.status === 'active',
  );

  return (
    <section className="py-4">
    <div className="relative">
    {/* Progress Lines */}
    <div className="absolute left-[10%] right-[10%] top-12 h-1 rounded-full bg-slate-200" />

    <div
      className="absolute left-[10%] top-12 h-1 rounded-full bg-emerald-600 transition-all duration-500"
      style={{
        width: `${(currentStepIndex / (steps.length - 1)) * 80}%`,
      }}
    />

    <div className="grid grid-cols-5 gap-2">
      {steps.map((step) => {
        const completed = step.status === 'completed';
        const active = step.status === 'active';

        return (
          <div
            key={step.id}
            className="flex flex-col items-center text-center"
          >
            {/* Icon */}
            <div className="mb-3 h-8 flex items-center justify-center">
              {active ? (
                <motion.div
                  animate={{
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                  }}
                  className="text-emerald-600"
                >
                  <StepIcon step={step} />
                </motion.div>
              ) : (
                <div
                  className={
                    completed
                      ? 'text-emerald-600'
                      : 'text-slate-300'
                  }
                >
                  <StepIcon step={step} />
                </div>
              )}
            </div>

            {/* Circle */}
            <div
              className={`
                z-10
                h-5
                w-5
                rounded-full
                transition-all
                ${
                  active || completed
                    ? 'bg-emerald-600 shadow-lg shadow-emerald-500/30'
                    : 'bg-slate-300'
                }
              `}
            />

            {/* Label */}
            <span
              className={`
                mt-4
                text-[11px]
                sm:text-xs
                md:text-sm
                leading-tight
                ${
                  active || completed
                    ? 'text-slate-800'
                    : 'text-slate-500'
                }
              `}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  </div>
</section>
  );
};

export default BookingProgressTracker;