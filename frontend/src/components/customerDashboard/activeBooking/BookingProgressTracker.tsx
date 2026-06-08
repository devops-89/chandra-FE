'use client';

import { motion } from 'framer-motion';
import { Bike, Check, Home, Play } from 'lucide-react';

import type { BookingProgressStatus } from '@/types/dashboardTypes/customerDashboard/customerDashboard.types';

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
  if (step.status === 'completed') {
    return <Check size={18} />;
  }

  if (step.id === 'on-way') {
    return <Bike size={18} />;
  }

  if (step.id === 'started') {
    return <Play size={18} />;
  }

  if (step.id === 'completed') {
    return <Home size={18} />;
  }

  return <Check size={18} />;
};

const BookingProgressTracker = ({
  status,
}: BookingProgressTrackerProps) => {
  const steps = getSteps(status);

  const currentStepIndex = steps.findIndex(
    (step) => step.status === 'active',
  );

  return (
    <section
      className="
        p-4
        rounded-3xl
      "
    >
      <div className="relative flex items-start justify-between">
        <div className="absolute left-5 right-5 top-5 h-1 bg-slate-200" />
        <div className="absolute left-5 top-5 h-1 bg-emerald-600"
          style={{
          width: `calc(${(currentStepIndex / (steps.length - 1)) * 100}% - 20px)`,
        }}
        />
        {steps.map((step, index) => {
          const completed =
            step.status === 'completed';

          const active =
            step.status === 'active';

          return (
            <div
              key={step.id}
              className="
                relative
                flex
                flex-1
                flex-col
                items-center
              "
            >
              {/* {index !== steps.length - 1 && (
                <div
                  className={`
                    absolute
                    left-1/2
                    top-5
                    h-1
                    w-full
                    ${
                      index < currentStepIndex
                        ? 'bg-emerald-600'
                        : 'bg-slate-200'
                    }
                  `}
                />
              )} */}

              {active ? (
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                  }}
                  className="
                    z-10
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-emerald-600
                    text-white
                  "
                >
                  <StepIcon step={step} />
                </motion.div>
              ) : (
                <div
                  className={`
                    z-10
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    ${
                      completed
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-500'
                    }
                  `}
                >
                  <StepIcon step={step} />
                </div>
              )}

              <span
                className={`
                  mt-3
                  text-sm
                  font-medium
                  ${
                    active || completed
                      ? 'text-emerald-700'
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
    </section>
  );
};

export default BookingProgressTracker;