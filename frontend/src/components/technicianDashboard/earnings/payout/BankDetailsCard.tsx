'use client';

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

export default function BankDetailsCard() {
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
        <AccountBalanceIcon className="text-emerald-500" />

        <h3 className="font-bold text-lg">
          Bank Account
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-slate-500 text-sm">
            Account Holder
          </p>

          <p className="font-medium">
            Vikram
          </p>
        </div>

        <div>
          <p className="text-slate-500 text-sm">
            Account Number
          </p>

          <p className="font-medium">
            XXXX XXXX 4587
          </p>
        </div>

        <div>
          <p className="text-slate-500 text-sm">
            IFSC Code
          </p>

          <p className="font-medium">
            HDFC0001234
          </p>
        </div>
      </div>

      <button
        className="
          mt-5
          w-full
          py-3
          rounded-2xl
          border
          border-emerald-500
          text-emerald-600
          font-semibold
        "
      >
        Edit Details
      </button>
    </div>
  );
}