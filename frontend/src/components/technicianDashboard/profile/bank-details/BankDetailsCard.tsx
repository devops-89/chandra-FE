'use client';

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

export default function BankDetailsCard() {
  return (
    <div
      className="
        bg-white
        border
        w-full
        border-slate-200
        rounded-3xl
        p-6
        shadow-sm
      "
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-900">
          Bank Details
        </h3>

        <AccountBalanceIcon className="text-emerald-500" />
      </div>

      <div className="space-y-5">
        <div>
          <p className="text-sm text-slate-500">
            Account Holder
          </p>

          <p className="font-semibold">
            Vikram
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Account Number
          </p>

          <p className="font-semibold">
            XXXX XXXX 4587
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            IFSC Code
          </p>

          <p className="font-semibold">
            HDFC0001234
          </p>
        </div>
      </div>

      <button
        className="
          mt-6
          w-full
          py-3
          rounded-2xl
          border
          bg-emerald-600
          hover:bg-emerald-700
          text-white
          font-semibold
          cursor-pointer
        "
      >
        Edit Details
      </button>
    </div>
  );
}