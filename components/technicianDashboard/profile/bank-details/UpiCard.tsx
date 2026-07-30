'use client';

import QrCode2Icon from '@mui/icons-material/QrCode2';
import { useAppSelector } from '@/redux/hooks';

export default function UpiCard() {
  const technician = useAppSelector((state) => state.technicianProfile.profile);
  const upiAccount = technician?.payoutAccounts?.find(acc => acc.accountType === 'VPA');

  return (
    <div
      className="
        bg-white
        border
        h-full
        w-full
        border-slate-200
        rounded-3xl
        p-6
        shadow-sm
        flex
        flex-col
      "
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">
          UPI Details
        </h3>

        <QrCode2Icon className="text-emerald-500" />
      </div>

      <div className="space-y-5">
        <div>
          <p className="text-sm text-slate-500 mb-1">
            Name
          </p>
        
          <p className="font-semibold">
            {technician?.firstName} {technician?.lastName}
          </p>
        </div>
        
        <div>
          <p className="text-sm text-slate-500 mb-1">
            UPI ID
          </p>
        
          <p className="font-semibold">
            {upiAccount?.upiId || 'Loading...'}
          </p>
        </div>
        </div>
      <button
        className="
          mt-auto
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