'use client';

import CreditCardIcon from '@mui/icons-material/CreditCard';
import VerifiedIcon from '@mui/icons-material/Verified';

export default function PanCard() {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        p-4
        rounded-2xl
        border
        border-slate-200
      "
    >
      <div className="flex items-center gap-4">
        <CreditCardIcon className="text-emerald-500" />

        <div>
          <p className="font-semibold">
            PAN Card
          </p>

          <p className="text-sm text-slate-500">
            ABCDE1234F
          </p>
        </div>
      </div>

      <VerifiedIcon className="text-emerald-500" />
    </div>
  );
}