'use client';

import CallIcon from '@mui/icons-material/Call';

import { useJobContext } from '../JobContext';

export default function CallCustomerButton() {
  const currentJob = useJobContext();

  return (
    <a
      href={currentJob?.customerPhone ? `tel:${currentJob.customerPhone}` : '#'}
      className="
        h-14
        px-8
        w-full
        sm:w-auto
        rounded-2xl
        border
        border-slate-200
        bg-white
        flex
        items-center
        justify-center
        gap-2
        font-medium
        transition-all
        cursor-pointer
        hover:border-emerald-500
      "
      onClick={(e) => {
        if (!currentJob?.customerPhone) {
          e.preventDefault();
          console.warn('No customer phone number available');
        }
      }}
    >
      <CallIcon />
      Call Customer
    </a>
  );
}