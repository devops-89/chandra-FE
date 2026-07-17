'use client';

const bars = [60, 45, 80, 95, 70, 30, 50];

export default function PerformanceChart() {
  return (
    <div className="flex items-end gap-3 h-32 mb-6">
      {bars.map((height, index) => (
        <div
          key={index}
          className={`
            flex-1
            rounded-t-lg
            transition-all
            ${
              index === 4
                ? 'bg-emerald-600'
                : 'bg-slate-200 hover:bg-emerald-200'
            }
          `}
          style={{
            height: `${height}%`,
          }}
        />
      ))}
    </div>
  );
}