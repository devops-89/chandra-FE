'use client';

import WorkHistoryIcon from '@mui/icons-material/WorkHistory';

import { useAppSelector } from '@/redux/hooks';

export default function ExperienceSection() {
  const technician = useAppSelector(
  (state) => state.technicianProfile.profile
);

const profile = technician?.technicianProfile;
  return (
    <div className="flex gap-4">
      <WorkHistoryIcon className="text-emerald-500" />

      <div>
        <p className="text-sm text-slate-500">
          Experience
        </p>

        <p className="font-semibold text-slate-900">
          {profile
          ? `${profile.yearsOfExperience} Years`
          : 'Loading...'}
        </p>

        <p className="text-slate-500 mt-1">
          {profile
          ? `${profile.status.replaceAll('_', ' ')} • ${profile.jobStatus}`
          : ''}
        </p>
      </div>
    </div>
  );
}