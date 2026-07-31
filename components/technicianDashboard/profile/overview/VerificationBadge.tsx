'use client';

import VerifiedIcon from '@mui/icons-material/Verified';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlined';

export default function VerificationBadge({ status }: { status?: string }) {
  if (!status) return null;

  let colorClass = "bg-slate-100 text-slate-700";
  let label = "Unknown Status";
  let Icon = VerifiedIcon;

  if (status === 'APPROVED') {
    colorClass = "bg-emerald-100 text-emerald-700";
    label = "Verified Technician";
    Icon = VerifiedIcon;
  } else if (status === 'PENDING_APPROVAL') {
    colorClass = "bg-amber-100 text-amber-700";
    label = "Pending Approval";
    Icon = PendingActionsIcon;
  } else if (status === 'REJECTED') {
    colorClass = "bg-red-100 text-red-700";
    label = "Verification Rejected";
    Icon = ErrorOutlineIcon;
  }

  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold w-fit ${colorClass}`}
    >
      <Icon fontSize="small" />
      {label}
    </div>
  );
}