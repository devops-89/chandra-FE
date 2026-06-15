'use client';

import { Eye } from 'lucide-react';

import type { ActiveJob } from '@/types/admin.types';

import JobStatusBadge from './JobStatusBadge';

interface JobRowProps {
  job: ActiveJob;
}

export default function JobRow({ job }: JobRowProps) {
  return (
    <tr className="border-b border-slate-50 hover:bg-slate-50/70 transition-colors">
      <td className="px-5 py-3.5 font-semibold text-emerald-700 text-sm">
        {job.id}
      </td>

      <td className="px-5 py-3.5 text-sm text-slate-800 font-medium">
        {job.customer}
      </td>

      <td className="px-5 py-3.5 text-sm text-slate-500">
        {job.technician}
      </td>

      <td className="px-5 py-3.5">
        <span className="inline-flex px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-700 text-xs font-medium">
          {job.category}
        </span>
      </td>

      <td className="px-5 py-3.5">
        <JobStatusBadge status={job.status} />
      </td>

      <td className="px-5 py-3.5">
        <button className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer">
          <Eye size={15} />
        </button>
      </td>
    </tr>
  );
}