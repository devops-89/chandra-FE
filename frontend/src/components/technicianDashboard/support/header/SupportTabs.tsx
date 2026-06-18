'use client';

const tabs = [
  'Overview',
  'Tickets',
  'Live Chat',
  'FAQs',
];

export default function SupportTabs() {
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