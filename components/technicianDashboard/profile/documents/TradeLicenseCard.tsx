'use client';

import BadgeIcon from '@mui/icons-material/Badge';
import VerifiedIcon from '@mui/icons-material/Verified';

import { useAppSelector } from '@/redux/hooks';

interface TradeLicenseCardProps {
  onView: (url: string, title: string) => void;
}

export default function TradeLicenseCard({ onView }: TradeLicenseCardProps) {
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
        <div className="flex items-center gap-3">
          <button
            onClick={() => onView(tradeLicenseUrl, 'Trade License')}
            className="text-emerald-600 text-sm font-medium hover:underline cursor-pointer bg-transparent border-none p-0"
          >
            View
          </button>
          <VerifiedIcon className="text-emerald-500" />
        </div>
      )}
    </div>
  );
}