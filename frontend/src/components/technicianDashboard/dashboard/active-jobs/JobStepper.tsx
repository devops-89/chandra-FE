'use client';

const steps = [
  {
    label: 'Assigned',
    icon: 'check',
    completed: true,
  },

  {
    label: 'Accepted',
    icon: 'check',
    completed: true,
  },

  {
    label: 'Travelling',
    icon: 'directions_car',
    active: true,
  },

  {
    label: 'Started',
    icon: 'play_arrow',
  },

  {
    label: 'Completed',
    icon: 'task_alt',
  },
];

export default function JobStepper() {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="relative flex justify-between items-center min-w-162.5 px-2">
        {/* Background Line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2" />

        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 w-[60%] h-0.5 bg-emerald-600 -translate-y-1/2" />

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