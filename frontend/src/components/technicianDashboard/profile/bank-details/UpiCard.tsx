'use client';

import QrCode2Icon from '@mui/icons-material/QrCode2';

export default function UpiCard() {
  return (
    <div
      className="
        bg-white
        border
        h-full
        border-slate-200
        rounded-3xl
        p-6
        shadow-sm
      "
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">
          UPI Details
        </h3>

        <QrCode2Icon className="text-emerald-500" />
      </div>

      <div>
        <p className="text-sm text-slate-500">
          UPI ID
        </p>

        <p className="font-semibold">
          vikram@upi
        </p>
      </div>

      <button
        className="
          mt-6
          w-full
          py-3
          rounded-2xl
          border
          cursor-pointer
          bg-emerald-600
          hover:bg-emerald-700
          text-white
          font-semibold
        "
      >
        Update UPI
      </button>
    </div>
  );
}