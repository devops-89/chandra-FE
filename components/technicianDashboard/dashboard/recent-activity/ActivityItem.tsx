'use client';

interface Props {
  icon: string;
  title: string;
  description: string;
  time: string;
  iconClass: string;
  showLine?: boolean;
}

export default function ActivityItem({
  icon,
  title,
  description,
  time,
  iconClass,
  showLine = true,
}: Props) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className={`
            w-8
            h-8
            rounded-full
            flex
            items-center
            justify-center
            ${iconClass}
          `}
        >
          <span className="material-symbols-outlined text-sm">
            {icon}
          </span>
        </div>

        {showLine && (
          <div className="w-0.5 h-10 bg-slate-200 mt-2" />
        )}
      </div>

      <div className="flex-1">
        <p className="font-bold text-slate-900">
          {title}
        </p>

        <p className="text-sm text-slate-500">
          {description}
        </p>

        <span className="text-xs text-slate-400 mt-1 block">
          {time}
        </span>
      </div>
    </div>
  );
}