'use client';

import VisibilityIcon from '@mui/icons-material/Visibility';

import type { ActiveJob } from '@/types/admin.types';

import JobStatusBadge from './JobStatusBadge';

interface JobRowProps {
  job: ActiveJob;
};

export default function JobRow({
  job,
}: JobRowProps) {
  return (
    <tr className="hover:bg-slate-50 transition">
      <td className="px-6 py-4 font-medium text-emerald-700">
        {job.id}
      </td>

      <td className="px-6 py-4">
        {job.customer}
      </td>

      <td className="px-6 py-4 text-slate-600">
        {job.technician}
      </td>

      <td className="px-6 py-4">
        <span
          className="
            px-3
            py-1
            rounded-full
            bg-emerald-100
            text-emerald-700
            text-xs
            flex
            justify-center
            font-medium
          "
        >
          {job.category}
        </span>
      </td>

      <td className="flex px-6 py-4">
        <JobStatusBadge
          status={job.status}
        />
      </td>

      <td className="px-6 py-4">
        <button className="text-slate-500 hover:text-emerald-700">
          <VisibilityIcon />
        </button>
      </td>
    </tr>
  );
}