'use client';

import DashboardCard from '../shared/DashboardCard';

interface StatCardProps {
  icon: string;
  title: string;
  value: string;
  badge?: string;
  actionText?: string;
}

export default function StatCard({
  icon,
  title,
  value,
  badge,
  actionText,
}: StatCardProps) {
  return (
    <DashboardCard className="p-4 md:p-6">
      <div className="flex justify-between items-start mb-4">
        <span
          className="
            material-symbols-outlined
            text-emerald-600
            bg-emerald-50
            p-2
            rounded-lg
            text-2xl
          "
        >
          {icon}
        </span>

        {badge && (
          <span
            className="
              bg-emerald-100
              text-emerald-700
              text-[10px]
              font-bold
              px-2
              py-1
              rounded-full
            "
          >
            {badge}
          </span>
        )}

        {actionText && (
          <button
            type="button"
            className="
              text-emerald-600
              text-xs
              border-b
              border-emerald-600
            "
          >
            {actionText}
          </button>
        )}
      </div>

      <p className="text-slate-500 text-sm">
        {title}
      </p>

      <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1">
        {value}
      </h3>
    </DashboardCard>
  );
}