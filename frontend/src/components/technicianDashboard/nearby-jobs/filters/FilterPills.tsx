'use client';

const filters = [
  'All Services',
  'Distance < 5km',
  'Payout: ₹500+',
  'Schedule: Today',
];

export default function FilterPills() {
  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((filter, index) => (
        <button
          key={filter}
          className={`
            px-5
            py-3
            rounded-full
            border
            text-sm
            font-medium
            transition-all

            ${
              index === 0
                ? 'bg-emerald-500 text-white border-emerald-500'
                : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-500'
            }
          `}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}