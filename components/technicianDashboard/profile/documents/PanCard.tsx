'use client';

import CreditCardIcon from '@mui/icons-material/CreditCard';
import VerifiedIcon from '@mui/icons-material/Verified';

import { useAppSelector } from '@/redux/hooks';

interface PanCardProps {
  onView: (url: string, title: string) => void;
}

export default function PanCard({ onView }: PanCardProps) {
  const technician = useAppSelector(
    (state) => state.technicianProfile.profile
  );

  const panUrl =
    technician?.technicianProfile.panUrl;
  return (
    <div
      className="
        flex
        items-center
        justify-between
        p-4
        rounded-2xla
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
            {panUrl ? 'Document Uploaded' : 'Not Uploaded'}
          </p>
        </div>
      </div>

      {panUrl && (
        <div className="flex items-center gap-3">
          <button
            onClick={() => onView(panUrl, 'PAN Card')}
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