"use client";

import { AlertCircle, Ban,Calendar, CheckCircle, Eye, FileText, Mail, Phone, X } from "lucide-react";

import type { Technician } from "@/constants/admin/technicianData";

interface Props {
  open: boolean;
  onClose: () => void;
  technician: Technician | null;
  onApprove: (tech: Technician) => void;
  onReject: (tech: Technician) => void;
  onViewDoc: (docName: string, techName: string) => void;
}

const VerificationDrawer = ({ open, onClose, technician, onApprove, onReject, onViewDoc }: Props) => {
  if (!open || !technician) return null;

  const isPending = technician.status === "Pending";
  const isActive = technician.status === "Active";
  const isSuspended = technician.status === "Suspended";

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Drawer Body panel */}
      <div className="relative z-50 h-full w-full max-w-md bg-white border-l border-slate-200 shadow-2xl p-6 overflow-y-auto flex flex-col justify-between select-none">
        
        <div>
          {/* Header */}
          <div className="mb-6 flex items-center justify-between border-b pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Technician Profile</h2>
              <p className="text-xs text-slate-500 mt-0.5">ID: {technician.id}</p>
            </div>
            
            <button
              onClick={onClose}
              className="rounded-full p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-6">
            {/* Avatar & Basic details */}
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-700 text-2xl font-bold shrink-0">
                {technician.name[0]}
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-slate-900 leading-snug">{technician.name}</h3>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 mt-1 text-[10px] font-bold ${
                    isActive
                      ? "bg-emerald-100 text-emerald-700"
                      : isPending
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {isActive && <CheckCircle size={10} />}
                  {isPending && <AlertCircle size={10} />}
                  {isSuspended && <Ban size={10} />}
                  {technician.status}
                </span>
              </div>
            </div>

            {/* Contact details */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Contact Details</h4>
              
              <div className="space-y-2.5 text-sm">
                <div className="flex items-center gap-3 text-slate-600">
                  <Mail size={16} className="text-slate-400 shrink-0" />
                  <span className="truncate">{technician.email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Phone size={16} className="text-slate-400 shrink-0" />
                  <span>{technician.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Calendar size={16} className="text-slate-400 shrink-0" />
                  <span>Applied on {technician.appliedAt}</span>
                </div>
              </div>
            </div>

            {/* Skills & Experience */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Credentials</h4>
              
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Experience</p>
                  <p className="text-base font-bold text-slate-800 mt-0.5">{technician.experience} Years</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Rating Score</p>
                  <p className="text-base font-bold text-slate-800 mt-0.5">⭐ {technician.rating}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {technician.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs text-emerald-700 border border-emerald-100/50 font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Documents Verification */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Uploaded Documents</h4>
              
              <div className="space-y-2">
                {technician.documents?.map((doc) => (
                  <div
                    key={doc.name}
                    className="flex items-center justify-between rounded-xl border border-slate-200 p-3 bg-white hover:border-emerald-600/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-100 text-slate-500 shrink-0">
                        <FileText size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-800">{doc.name}</p>
                        <p className="text-[10px] text-slate-400">{doc.type}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => onViewDoc(doc.name, technician.name)}
                      className="rounded-lg p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 transition-all flex items-center justify-center gap-1 text-xs font-bold cursor-pointer"
                    >
                      <Eye size={14} />
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* If Suspended show the reason */}
            {isSuspended && technician.rejectionReason && (
              <div className="rounded-xl bg-red-50 p-4 border border-red-100 text-xs text-red-700 space-y-1">
                <p className="font-bold">Suspension / Rejection Details</p>
                <p><strong>Reason:</strong> {technician.rejectionReason}</p>
                {technician.rejectionNotes && <p><strong>Notes:</strong> {technician.rejectionNotes}</p>}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        {isPending ? (
          <div className="flex gap-3 border-t pt-4 mt-6">
            <button
              onClick={() => onReject(technician)}
              className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-semibold hover:bg-slate-50 text-slate-600 text-center cursor-pointer transition-colors"
            >
              Reject
            </button>
            <button
              onClick={() => onApprove(technician)}
              className="flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 py-3 text-sm font-semibold text-white shadow-xs text-center cursor-pointer transition-colors"
            >
              Approve
            </button>
          </div>
        ) : (
          <div className="border-t pt-4 mt-6">
            <button
              onClick={onClose}
              className="w-full rounded-xl bg-slate-900 hover:bg-slate-800 py-3 text-sm font-semibold text-white text-center cursor-pointer transition-colors"
            >
              Done Reviewing
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationDrawer;
