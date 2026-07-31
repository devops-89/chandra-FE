'use client';

import BadgeIcon from '@mui/icons-material/Badge';
import VerifiedIcon from '@mui/icons-material/Verified';

import { useAppSelector } from '@/redux/hooks';

interface AadhaarCardProps {
  onView: (url: string, title: string) => void;
}

export default function AadhaarCard({ onView }: AadhaarCardProps) {
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
        <div className="flex items-center gap-3">
          <button
            onClick={() => onView(aadharUrl, 'Aadhaar Card')}
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