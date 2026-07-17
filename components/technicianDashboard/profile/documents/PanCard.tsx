'use client';

import CreditCardIcon from '@mui/icons-material/CreditCard';
import VerifiedIcon from '@mui/icons-material/Verified';

import { useAppSelector } from '@/redux/hooks';

export default function PanCard() {
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
        <VerifiedIcon className="text-emerald-500" />
      )}
    </div>
  );
}