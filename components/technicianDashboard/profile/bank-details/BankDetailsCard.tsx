'use client';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

import { useAppSelector } from '@/redux/hooks';

export default function BankDetailsCard() {
  const technician = useAppSelector(
    (state) => state.technicianProfile.profile
  );

  const payoutAccount = technician?.payoutAccounts?.find(acc => acc.accountType === 'BANK_ACCOUNT');

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
            {payoutAccount
            ? `${payoutAccount.accountHolderName}`
            : 'Loading...'}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Account Number
          </p>

          <p className="font-semibold">
            {payoutAccount
            ? `${payoutAccount.accountNumber}`
            : 'Loading...'}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            IFSC Code
          </p>

          <p className="font-semibold">
            {payoutAccount
            ? `${payoutAccount.ifscCode}`
            : 'Loading...'}
          </p>
        </div>
        <div>
          <p className="text-sm text-slate-500">
            Bank Name
          </p>

          <p className="font-semibold">
            {payoutAccount
            ? `${payoutAccount.bankName}`
            : 'Loading...'}
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