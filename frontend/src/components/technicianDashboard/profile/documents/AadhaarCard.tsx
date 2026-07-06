'use client';

import BadgeIcon from '@mui/icons-material/Badge';
import VerifiedIcon from '@mui/icons-material/Verified';

import { useAppSelector } from '@/redux/hooks';

export default function AadhaarCard() {
  const technician = useAppSelector(
    (state) => state.technicianProfile.profile
  );

  const aadharUrl = technician?.technicianProfile.aadharUrl;

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
            {aadharUrl ? 'Document Uploaded' : 'Not Uploaded'}
          </p>
        </div>
      </div>

      {aadharUrl && (
        <VerifiedIcon className="text-emerald-500" />
      )}
    </div>
  );
}