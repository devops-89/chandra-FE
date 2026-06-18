'use client';

export default function ResolutionCard() {
  return (
    <div
      className="
        bg-white
        border
        border-slate-200
        rounded-3xl
        p-6
        shadow-sm
      "
    >
      <h3 className="text-xl font-bold mb-6">
        Resolution Metrics
      </h3>

      <div className="space-y-5">
        <div>
          <div className="flex justify-between mb-2">
            <span>Resolution Rate</span>
            <span>96%</span>
          </div>

          <div className="h-2 bg-slate-100 rounded-full">
            <div className="h-full w-[96%] bg-emerald-500 rounded-full" />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span>Avg Response Time</span>
            <span>15 Min</span>
          </div>

          <div className="h-2 bg-slate-100 rounded-full">
            <div className="h-full w-[85%] bg-emerald-500 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}