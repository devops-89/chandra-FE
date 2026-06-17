'use client';

import WorkHistoryIcon from '@mui/icons-material/WorkHistory';

export default function ExperienceSection() {
  return (
    <div className="flex gap-4">
      <WorkHistoryIcon className="text-emerald-500" />

      <div>
        <p className="text-sm text-slate-500">
          Experience
        </p>

        <p className="font-semibold text-slate-900">
          5 Years
        </p>

        <p className="text-slate-500 mt-1">
          Residential & Commercial Services
        </p>
      </div>
    </div>
  );
}