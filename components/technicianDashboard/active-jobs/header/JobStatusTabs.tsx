'use client';

import { BOOKING_STATUS } from '@/types/enums';

type JobStatusTabsProps = {
  activeStatus: BOOKING_STATUS;
  onChangeStatus: (status: BOOKING_STATUS) => void;
};

const tabs: { label: string; value: BOOKING_STATUS }[] = [
  { label: 'Accepted', value: BOOKING_STATUS.ACCEPTED },
  { label: 'Enroute', value: BOOKING_STATUS.ENROUTE },
  { label: 'Arrived', value: BOOKING_STATUS.ARRIVED },
  { label: 'Ongoing', value: BOOKING_STATUS.ONGOING },
  { label: 'Completed', value: BOOKING_STATUS.COMPLETED },
  { label: 'Cancelled', value: BOOKING_STATUS.CANCELLED },
];

export default function JobStatusTabs({ activeStatus, onChangeStatus }: JobStatusTabsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChangeStatus(tab.value)}
          className={`
            px-5
            py-3
            rounded-full
            border
            text-sm
            font-medium
            cursor-pointer
            transition-all
            ${
              activeStatus === tab.value
                ? 'bg-emerald-500 text-white border-emerald-500'
                : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-500'
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}