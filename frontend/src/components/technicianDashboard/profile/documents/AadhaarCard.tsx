'use client';

import BadgeIcon from '@mui/icons-material/Badge';
import VerifiedIcon from '@mui/icons-material/Verified';

export default function AadhaarCard() {
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
        <BadgeIcon className="text-emerald-500" />

        <div>
          <p className="font-semibold">
            Aadhaar Card
          </p>

          <p className="text-sm text-slate-500">
            XXXX XXXX 4587
          </p>
        </div>
      </div>

      <VerifiedIcon className="text-emerald-500" />
    </div>
  );
}