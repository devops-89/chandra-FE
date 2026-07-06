'use client';

import BadgeIcon from '@mui/icons-material/Badge';
import VerifiedIcon from '@mui/icons-material/Verified';

import { useAppSelector } from '@/redux/hooks';

export default function TradeLicenseCard() {
  const technician = useAppSelector(
    (state) => state.technicianProfile.profile
  );

  const tradeLicenseUrl =
    technician?.technicianProfile.tradeLicenseUrl;

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
            Trade License
          </p>

          <p className="text-sm text-slate-500">
            {tradeLicenseUrl
              ? 'Document Uploaded'
              : 'Not Uploaded'}
          </p>
        </div>
      </div>

      {tradeLicenseUrl && (
        <VerifiedIcon className="text-emerald-500" />
      )}
    </div>
  );
}