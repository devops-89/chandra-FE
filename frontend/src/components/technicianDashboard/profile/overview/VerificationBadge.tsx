'use client';

import VerifiedIcon from '@mui/icons-material/Verified';

export default function VerificationBadge() {
  return (
    <div
      className="
        flex
        items-center
        gap-2
        px-3
        py-2
        rounded-full
        bg-emerald-100
        text-emerald-700
        text-sm
        font-semibold
        w-fit
      "
    >
      <VerifiedIcon fontSize="small" />

      Verified Technician
    </div>
  );
}