'use client';

const tabs = [
  'Overview',
  'Documents',
  'Availability',
  'Bank Details',
  'Settings',
];

export default function ProfileTabs() {
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
              index === 0
                ? 'bg-emerald-500 text-white border-emerald-500'
                : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-500'
            }
          `}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}