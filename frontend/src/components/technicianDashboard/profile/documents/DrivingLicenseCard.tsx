'use client';

import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import VerifiedIcon from '@mui/icons-material/Verified';

export default function DrivingLicenseCard() {
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
        <DirectionsCarIcon className="text-emerald-500" />

        <div>
          <p className="font-semibold">
            Driving License
          </p>

          <p className="text-sm text-slate-500">
            DL-1420110012345
          </p>
        </div>
      </div>

      <VerifiedIcon className="text-emerald-500" />
    </div>
  );
}