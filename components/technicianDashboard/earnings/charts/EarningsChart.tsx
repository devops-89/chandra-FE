'use client';

import MonthlyChart from './MonthlyChart';
import WeeklyChart from './WeeklyChart';

export default function EarningsChart() {
  return (
    <div
      className="
        bg-white
        border
        border-slate-200
        rounded-3xl
        p-5
        shadow-sm
      "
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            Earnings Analytics
          </h3>

          <p className="text-slate-500 text-sm mt-1">
            Weekly and monthly performance
          </p>
        </div>

        <span
          className="
            bg-emerald-100
            text-emerald-700
            px-3
            py-1
            rounded-full
            text-sm
            font-medium
          "
        >
          +12.4%
        </span>
      </div>

      <div className="space-y-7">
        <WeeklyChart />

        <div className="border-t border-slate-200" />

        <MonthlyChart />
      </div>
    </div>
  );
}