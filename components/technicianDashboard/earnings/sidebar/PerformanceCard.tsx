'use client';

export default function PerformanceCard() {
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
      <h3 className="font-bold text-lg mb-6">
        Performance
      </h3>

      <div className="space-y-5">
        <div>
          <div className="flex justify-between mb-2">
            <span>Job Success Rate</span>
            <span>94%</span>
          </div>

          <div className="h-2 bg-slate-100 rounded-full">
            <div className="h-full w-[94%] bg-emerald-500 rounded-full" />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span>Customer Rating</span>
            <span>4.9</span>
          </div>

          <div className="h-2 bg-slate-100 rounded-full">
            <div className="h-full w-[98%] bg-emerald-500 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}