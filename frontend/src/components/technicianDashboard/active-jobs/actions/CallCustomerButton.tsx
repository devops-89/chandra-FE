'use client';

import CallIcon from '@mui/icons-material/Call';

export default function CallCustomerButton() {
  return (
    <button
      className="
        h-14
        rounded-2xl
        border
        border-slate-200
        bg-white
        flex
        items-center
        justify-center
        gap-2
        cursor-pointer
        font-medium
        hover:border-emerald-500
        transition-all
      "
    >
      <CallIcon />

      Call Customer
    </button>
  );
}