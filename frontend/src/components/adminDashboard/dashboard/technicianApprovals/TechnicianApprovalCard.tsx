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
      <div className="group rounded-2xl p-10 border border-slate-100 bg-slate-50/50 hover:border-emerald-200 hover:bg-white hover:shadow-sm transition-all duration-200">
        {/* Top row: Avatar + Info + Status Badge */}
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white text-sm font-bold">
            {initials}
          </div>

          {/* Name + meta */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h4 className="font-semibold text-slate-900 text-sm leading-tight truncate">
                  {technician.name}
                </h4>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="flex items-center gap-1 text-[11px] text-slate-500">
                    <Briefcase size={11} className="text-slate-400" />
                    {technician.experience} yrs exp
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-slate-500">
                    <MapPin size={11} className="text-slate-400" />
                    {technician.address}
                  </span>
                </div>
              </div>

              {/* Verified / Pending badge */}
              <span
                className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                  technician.verified
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {technician.verified ? (
                  <CheckCircle size={10} />
                ) : (
                  <Clock size={10} />
                )}
                {technician.verified ? 'Docs Verified' : 'Pending'}
              </span>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {technician.skills.map((skill: string) => (
            <span
              key={skill}
              className="rounded-lg bg-emerald-100 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => console.log('approved', technician.id)}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors cursor-pointer"
            >
              <Check size={12} />
              Approve
            </button>
            <button
              onClick={() => console.log('rejected', technician.id)}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors cursor-pointer"
            >
              <X size={12} />
              Reject
            </button>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-1 text-xs font-medium text-emerald-700 hover:text-emerald-800 hover:underline transition-colors cursor-pointer"
          >
            <Eye size={13} />
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