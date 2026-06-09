'use client';

import Card from '@mui/material/Card';

export default function RevenueTrendCard() {
  return (
    <Card
      elevation={0}
      className="p-6 rounded-2xl border border-slate-200"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-800">
          Revenue Trend (7d)
        </h3>

        <span className="text-sm font-semibold text-emerald-600">
          +12.4% ↑
        </span>
      </div>

      <div className="mt-6 height:180px">
        <svg
          viewBox="0 0 400 150"
          className="w-full h-full"
        >
          <defs>
            <linearGradient
              id="gradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="#10b981"
                stopOpacity="0.35"
              />

              <stop
                offset="100%"
                stopColor="#10b981"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>

          <path
            d="
            M0,120
            Q50,110
            80,90
            T160,70
            T240,40
            T320,60
            T400,20
          "
            fill="none"
            stroke="#059669"
            strokeWidth="4"
            strokeLinecap="round"
          />

          <path
            d="
            M0,120
            Q50,110
            80,90
            T160,70
            T240,40
            T320,60
            T400,20
            L400,150
            L0,150
            Z
          "
            fill="url(#gradient)"
          />
        </svg>
      </div>
    </Card>
  );
}