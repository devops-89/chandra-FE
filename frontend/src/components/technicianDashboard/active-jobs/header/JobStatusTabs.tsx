'use client';

const tabs = [
  'Assigned',
  'Accepted',
  'Travelling',
  'Started',
  'Completed',
];

export default function JobStatusTabs() {
  return (
    <div className="flex flex-wrap gap-3">
      {tabs.map((tab, index) => (
        <button
          key={tab}
          className={`
            px-5
            py-3
            rounded-full
            border
            text-sm
            font-medium
            transition-all

            ${
              index === 2
                ? 'bg-emerald-500 text-white border-emerald-500'
                : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-500'
            }
          `}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}