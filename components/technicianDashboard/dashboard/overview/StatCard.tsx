'use client';

import DashboardCard from '../shared/DashboardCard';

interface StatCardProps {
  icon: string;
  title: string;
  value: string;
  badge?: string;
  actionText?: string;
  onClick?: () => void;
}

export default function StatCard({
  icon,
  title,
  value,
  badge,
  actionText,
  onClick,
}: StatCardProps) {
  return (
    <DashboardCard 
      className={`p-5 md:p-6 transition-all duration-300 ease-in-out rounded-2xl border border-slate-150/80 bg-surface-white hover:shadow-md hover:translate-y-[-2px] ${
        onClick ? 'cursor-pointer hover:border-emerald-600/50 hover:bg-emerald-50/10' : ''
      }`}
      onClick={onClick}
      aria-label={`${title}: ${value}`}
    >
      <div className="flex justify-between items-start mb-4">
        <span
          className="material-symbols-outlined text-emerald-700 bg-emerald-100/60 p-2.5 rounded-xl text-2xl transition-transform duration-250"
          aria-hidden="true"
        >
          {icon}
        </span>

        {badge && (
          <span
            className="
              bg-emerald-100
              text-emerald-800
              text-xs
              font-semibold
              px-2.5
              py-0.5
              rounded-full
              tracking-wide
            "
          >
            {badge}
          </span>
        )}

        {actionText && (
          <button
            type="button"
            className="
              text-emerald-700
              text-xs
              font-bold
              border-b
              border-emerald-600/30
              hover:border-emerald-700
              pb-0.5
              transition-all
            "
          >
            {actionText}
          </button>
        )}
      </div>

      <p className="text-slate-500 text-xs md:text-sm font-medium tracking-wide">
        {title}
      </p>

      <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1 tracking-tight">
        {value}
      </h3>
    </DashboardCard>
  );
}