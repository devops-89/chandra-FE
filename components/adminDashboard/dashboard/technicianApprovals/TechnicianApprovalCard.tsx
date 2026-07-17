'use client';

import { Briefcase, Check, CheckCircle, Clock, Eye, MapPin, X } from 'lucide-react';
import { useState } from 'react';

import type { TechnicianApproval } from '@/types/admin.types';

import TechnicianDetailsModal from './TechnicianDetailsModal';

interface Props {
  technician: TechnicianApproval;
}

export default function TechnicianApprovalCard({ technician }: Props) {
  const [open, setOpen] = useState(false);

  const initials = technician.name
    .split(' ')
    .map((word: string) => word[0])
    .join('');

  return (
    <>
      <div className="group rounded-2xl border border-slate-100 bg-slate-50/60 p-4 transition-all duration-200 hover:border-emerald-200 hover:bg-white hover:shadow-sm sm:p-5 lg:p-6">
        {/* Top row: Avatar + Info + Status Badge */}
        <div className="flex items-start gap-3 sm:gap-4">
          {/* Avatar */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-base font-bold text-white">
            {initials}
          </div>

          {/* Name + meta */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h4 className="break-words text-base font-semibold leading-snug text-slate-900 sm:text-sm">
                  {technician.name}
                </h4>
                <div className="mt-1.5 flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
                  <span className="flex items-center gap-1.5 whitespace-nowrap text-xs text-slate-600">
                    <Briefcase size={13} className="shrink-0 text-slate-500" />
                    {technician.experience} yrs exp
                  </span>
                  <span className="flex items-start gap-1.5 text-xs leading-snug text-slate-600">
                    <MapPin size={13} className="mt-0.5 shrink-0 text-slate-500" />
                    {technician.address}
                  </span>
                </div>
              </div>

              {/* Verified / Pending badge */}
              <span
                className={`inline-flex w-fit shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  technician.verified
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {technician.verified ? (
                  <CheckCircle size={12} />
                ) : (
                  <Clock size={12} />
                )}
                {technician.verified ? 'Docs Verified' : 'Pending'}
              </span>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-4 flex flex-wrap gap-2">
          {technician.skills.map((skill: string) => (
            <span
              key={skill}
              className="rounded-lg bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
            <button
              onClick={() => {}}
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 cursor-pointer sm:h-auto sm:py-1.5 sm:text-xs"
            >
              <Check size={14} />
              Approve
            </button>
            <button
              onClick={() => {}}
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 cursor-pointer sm:h-auto sm:py-1.5 sm:text-xs"
            >
              <X size={14} />
              Reject
            </button>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-emerald-100 bg-emerald-50 text-sm font-semibold text-emerald-700 transition-colors hover:border-emerald-200 hover:bg-emerald-100 hover:text-emerald-800 cursor-pointer sm:h-auto sm:border-0 sm:bg-transparent sm:text-xs sm:hover:bg-transparent sm:hover:underline"
          >
            <Eye size={15} />
            View Details
          </button>
        </div>
      </div>

      <TechnicianDetailsModal
        open={open}
        onClose={() => setOpen(false)}
        technician={technician}
      />
    </>
  );
}
