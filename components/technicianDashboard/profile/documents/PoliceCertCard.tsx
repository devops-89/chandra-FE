'use client';

import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import VerifiedIcon from '@mui/icons-material/Verified';

import { useAppSelector } from '@/redux/hooks';

interface PoliceCertCardProps {
  onView: (url: string, title: string) => void;
}

export default function PoliceCertCard({ onView }: PoliceCertCardProps) {
  const technician = useAppSelector(
    (state) => state.technicianProfile.profile
  );

  const policeCertUrl =
    technician?.technicianProfile.policeCertUrl;

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
        <LocalPoliceIcon className="text-emerald-500" />

        <div>
          <p className="font-semibold">
            Police Clearance Certificate
          </p>

          <p className="text-sm text-slate-500">
            {policeCertUrl
              ? 'Document Uploaded'
              : 'Not Uploaded'}
          </p>
        </div>
      </div>

      {policeCertUrl && (
        <div className="flex items-center gap-3">
          <button
            onClick={() => onView(policeCertUrl, 'Police Clearance Certificate')}
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
