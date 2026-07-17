'use client';

import { useAppSelector } from '@/redux/hooks';

export default function JobStepper() {
  const currentJob = useAppSelector((state) => state.activeJobs.currentJob);
  const status = currentJob?.status || 'assigned';
  const statusOrder = ['assigned', 'accepted', 'travelling', 'started', 'completed'];
  const currentIndex = statusOrder.indexOf(status.toLowerCase());

  const steps = [
    {
      label: 'Assigned',
      icon: 'check',
      completed: currentIndex > 0,
      active: currentIndex === 0,
    },
    {
      label: 'Accepted',
      icon: 'check',
      completed: currentIndex > 1,
      active: currentIndex === 1,
    },
    {
      label: 'Travelling',
      icon: 'directions_car',
      completed: currentIndex > 2,
      active: currentIndex === 2,
    },
    {
      label: 'Started',
      icon: 'play_arrow',
      completed: currentIndex > 3,
      active: currentIndex === 3,
    },
    {
      label: 'Completed',
      icon: 'task_alt',
      completed: currentIndex === 4,
      active: currentIndex === 4,
    },
  ];

  const progressPercent = `${currentIndex * 25}%`;

  return (
    <div className="overflow-x-auto pb-2">
      <div className="relative flex justify-between items-center min-w-162.5 px-2">
        {/* Background Line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2" />

        {/* Progress Line */}
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-emerald-600 -translate-y-1/2 transition-all duration-300" 
          style={{ width: progressPercent }}
        />

        {steps.map((step) => (
          <div
            key={step.label}
            className="relative z-10 flex flex-col items-center gap-2"
          >
            {step.completed ? (
              <div
                className="
                  w-10 h-10
                  rounded-full
                  bg-emerald-600
                  text-white
                  flex
                  items-center
                  justify-center
                  shadow-lg
                "
              >
                <span className="material-symbols-outlined">
                  check
                </span>
              </div>
            ) : step.active ? (
              <div
                className="
                  w-10 h-10
                  rounded-full
                  bg-white
                  border-4
                  border-emerald-600
                  text-emerald-600
                  flex
                  items-center
                  justify-center
                  shadow-md
                "
              >
                <span className="material-symbols-outlined">
                  {step.icon}
                </span>
              </div>
            ) : (
              <div
                className="
                  w-10 h-10
                  rounded-full
                  bg-slate-100
                  text-slate-400
                  flex
                  items-center
                  justify-center
                "
              >
                <span className="material-symbols-outlined">
                  {step.icon}
                </span>
              </div>
            )}

            <span
              className={`
                text-sm
                whitespace-nowrap
                ${
                  step.completed || step.active
                    ? 'text-emerald-600 font-semibold'
                    : 'text-slate-400'
                }
              `}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}