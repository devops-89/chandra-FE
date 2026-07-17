'use client';

import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';

export default function EarningsInsightsCard() {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        border-slate-200
        p-6
        shadow-sm
      "
    >
      <div className="flex items-center gap-3 mb-4">
        <LightbulbOutlinedIcon className="text-amber-500" />

        <h3 className="font-bold text-lg">
          Earnings Insight
        </h3>
      </div>

      <p className="text-slate-600 leading-relaxed">
        Your weekend earnings are
        <span className="font-semibold text-emerald-600">
          {' '}32% higher
        </span>
        than weekdays.
      </p>

      <div
        className="
          mt-4
          bg-emerald-50
          rounded-2xl
          p-4
        "
      >
        <p className="text-sm text-emerald-700">
          Accept more Saturday jobs to maximize income.
        </p>
      </div>
    </div>
  );
}