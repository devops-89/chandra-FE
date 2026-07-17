'use client';

import PaymentsIcon from '@mui/icons-material/Payments';

export default function WithdrawalCard() {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        border-slate-200
        p-6
        shadow-sm
      "
    >
      <div className="flex items-center gap-3 mb-5">
        <PaymentsIcon className="text-emerald-500" />

        <h3 className="font-bold text-lg">
          Quick Withdrawal
        </h3>
      </div>

      <input
        type="number"
        placeholder="Enter Amount"
        className="
          w-full
          border
          border-slate-200
          rounded-2xl
          px-4
          py-3
          outline-none
          focus:border-emerald-500
        "
      />

      <button
        className="
          mt-4
          w-full
          py-3
          rounded-2xl
          bg-emerald-500
          text-white
          font-semibold
          hover:bg-emerald-600
        "
      >
        Withdraw Now
      </button>
    </div>
  );
}