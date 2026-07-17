'use client';

import CheckIcon from '@mui/icons-material/Check';

interface Props {
  label: string;
  completed?: boolean;
  active?: boolean;
}

export default function StepperItem({
  label,
  completed,
  active,
}: Props) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`
          h-10
          w-10
          rounded-full
          flex
          items-center
          justify-center
          border-4
          relative
          z-10

          ${
            completed
              ? 'bg-emerald-500 border-emerald-500 text-white'
              : active
              ? 'bg-white border-emerald-500 text-emerald-500'
              : 'bg-white border-slate-300 text-slate-400'
          }
        `}
      >
        {completed ? (
          <CheckIcon fontSize="small" />
        ) : (
          <span className="text-sm font-bold">
            •
          </span>
        )}
      </div>

      <span
        className={`
          mt-3
          text-xs
          md:text-sm
          font-medium

          ${
            completed || active
              ? 'text-emerald-600'
              : 'text-slate-400'
          }
        `}
      >
        {label}
      </span>
    </div>
  );
}