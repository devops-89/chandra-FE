'use client';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  label: string;
  completed?: boolean;
  active?: boolean;
  isCancelled?: boolean;
}

export default function StepperItem({
  label,
  completed,
  active,
  isCancelled,
}: Props) {
  let borderColor = 'border-slate-300';
  let bgColor = 'bg-white';
  let textColor = 'text-slate-400';
  let labelColor = 'text-slate-400';

  if (isCancelled) {
    borderColor = 'border-red-500';
    bgColor = 'bg-red-500';
    textColor = 'text-white';
    labelColor = 'text-red-500';
  } else if (completed) {
    borderColor = 'border-emerald-500';
    bgColor = 'bg-emerald-500';
    textColor = 'text-white';
    labelColor = 'text-emerald-600';
  } else if (active) {
    borderColor = 'border-emerald-500';
    bgColor = 'bg-white';
    textColor = 'text-emerald-500';
    labelColor = 'text-emerald-600';
  }

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
          ${bgColor} ${borderColor} ${textColor}
        `}
      >
        {isCancelled ? (
          <CloseIcon fontSize="small" />
        ) : completed ? (
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
          ${labelColor}
        `}
      >
        {label}
      </span>
    </div>
  );
}