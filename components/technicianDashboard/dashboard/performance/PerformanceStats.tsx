'use client';

export default function PerformanceStats() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <span className="text-slate-500">
          Total Earnings
        </span>

        <span className="font-bold">
          ₹12,400
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-slate-500">
          Hours Online
        </span>

        <span className="font-bold">
          32h 15m
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-slate-500">
          Jobs Completed
        </span>

        <span className="font-bold">
          18
        </span>
      </div>
    </div>
  );
}