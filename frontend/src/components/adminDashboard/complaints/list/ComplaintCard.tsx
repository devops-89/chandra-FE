'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import type { AdminComplaintListItem } from '@/types/admin/complaints.types';
import router from 'next/dist/shared/lib/router/router';
interface Props {
  complaint: AdminComplaintListItem;
}

const ComplaintCard = ({ complaint }: Props) => {
  const router = useRouter();
  const [ ] = useState(false);

  return (
    <>
      <div className="border border-slate-200 rounded-2xl bg-white p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between cursor-default">
        <div>
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-red-600">
                Complaint ID: {complaint.id}
              </span>
              <h4 className="mt-1 font-semibold text-slate-900 text-lg leading-snug">
                {complaint.createdBy.name}
              </h4>
            </div>
            <span
             className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                complaint.status === 'PENDING'
                  ? 'bg-yellow-100 text-yellow-700'
                  : complaint.status === 'RESOLVED'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
              >
              {complaint.status}
            </span>
          </div>

          <div className="mt-4 space-y-1">
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Issue Description</p>
            <p className="text-sm text-slate-700 font-medium leading-relaxed">{complaint.title}</p>
          </div>
        </div>

        <div className="border-t border-slate-100 mt-4 pt-3 flex items-center justify-between text-slate-700">
          <div>
            <span className="text-xs text-slate-500 font-medium block">Created On</span>
            <span className="text-xs text-slate-700 font-semibold">{new Date(complaint.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
              {complaint.status}
            </span>

            <button
              onClick={() => router.push(`/dashboard/admin/complaints/${complaint.id}`)}
              className="text-emerald-600 hover:text-emerald-700 font-medium text-sm hover:underline cursor-pointer"
            >
              View
            </button>
          </div>
        </div>
      </div>

      {/* <ComplaintDetailsDrawer
        open={open}
        onClose={() => setOpen(false)}
      /> */}
    </>
  );
};

export default ComplaintCard;
