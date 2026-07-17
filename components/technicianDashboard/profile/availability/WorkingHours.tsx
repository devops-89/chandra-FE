'use client';

import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function WorkingHours() {
  return (
    <div className="flex gap-4">
      <AccessTimeIcon className="text-emerald-500" />

      <div>
        <p className="text-sm text-slate-500">
          Working Hours
        </p>

        <p className="font-semibold">
          09:00 AM - 07:00 PM
        </p>

        <p className="text-slate-500 text-sm mt-1">
          Monday - Saturday
        </p>
      </div>
    </div>
  );
}