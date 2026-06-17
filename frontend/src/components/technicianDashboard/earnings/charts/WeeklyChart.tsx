'use client';

import { WEEKLY_EARNINGS } from "@/constants/technicianDashboard/earnings/earnings.constants";

export default function WeeklyChart() {
  const maxValue = Math.max(
    ...WEEKLY_EARNINGS.map((item) => item.amount)
  );

  return (
    <div>
      <h4 className="font-semibold text-slate-900 mb-6">
        Weekly Earnings
      </h4>

      <div className="h-64 flex items-end justify-between gap-4">
        {WEEKLY_EARNINGS.map((item) => (
          <div
            key={item.day}
            className="flex flex-col items-center flex-1"
          >
            <div
              className="
                w-full
                rounded-t-xl
                bg-linear-to-t
                from-emerald-600
                to-emerald-400
                transition-all
                hover:opacity-80
              "
              style={{
                height: `${(item.amount / maxValue) * 180}px`,
              }}
            />

            <p
              className="
                mt-3
                text-sm
                text-slate-500
              "
            >
              {item.day}
            </p>

            <p
              className="
                text-xs
                font-medium
                text-slate-700
              "
            >
              ₹{item.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}