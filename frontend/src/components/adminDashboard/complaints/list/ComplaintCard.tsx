'use client';

import { useState } from 'react';

import type { Complaint } from '@/constants/admin/complaintData';

import ComplaintDetailsDrawer from '../details/ComplaintDetailsDrawer';

interface Props {
  complaint: Complaint;
}

const ComplaintCard = ({ complaint }: Props) => {
  const [open, setOpen] = useState(false);

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
                {complaint.customerName}
              </h4>
            </div>

            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                complaint.priority === 'High'
                  ? 'bg-red-100 text-red-700'
                  : complaint.priority === 'Medium'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-green-100 text-green-700'
              }`}
            >
              {complaint.priority} Priority
            </span>
          </div>

          <div className="mt-4 space-y-1">
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Issue Description</p>
            <p className="text-sm text-slate-700 font-medium leading-relaxed">{complaint.issueType}</p>
          </div>
        </div>

        <div className="border-t border-slate-100 mt-4 pt-3 flex items-center justify-between text-slate-700">
          <div>
            <span className="text-xs text-slate-500 font-medium block">Created On</span>
            <span className="text-xs text-slate-700 font-semibold">{complaint.createdAt}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
              {complaint.status}
            </span>

            <button
              onClick={() => setOpen(true)}
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
