'use client';

import { MONTHLY_EARNINGS } from "@/constants/technicianDashboard/earnings/earnings.constants";

export default function MonthlyChart() {
  const maxValue = Math.max(
    ...MONTHLY_EARNINGS.map((item) => item.amount)
  );

  return (
    <div>
      <h4 className="font-semibold text-slate-900 mb-6">
        Monthly Earnings
      </h4>

      <div className="space-y-5">
        {MONTHLY_EARNINGS.map((item) => (
          <div key={item.month}>
            <div className="flex justify-between">
              <span className="text-slate-600">
                {item.month}
              </span>

              <span className="font-semibold text-slate-900">
                ₹{item.amount.toLocaleString()}
              </span>
            </div>

            <div
              className="
                h-3
                bg-slate-100
                rounded-full
                overflow-hidden
              "
            >
              <div
                className="
                  h-full
                  rounded-full
                  bg-linear-to-r
                  from-emerald-500
                  to-emerald-600
                "
                style={{
                  width: `${
                    (item.amount / maxValue) * 100
                  }%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}