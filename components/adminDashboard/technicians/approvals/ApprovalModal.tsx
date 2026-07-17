"use client";

import { motion } from "framer-motion";
import {CheckCircle, ShieldCheck, X } from "lucide-react";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  technicianName: string;
}

const ApprovalModal = ({ open, onClose, onConfirm, technicianName }: Props) => {
  const [checks, setChecks] = useState({
    identity: false,
    license: false,
    background: false,
  });

  if (!open) return null;

  const canApprove = checks.identity && checks.license && checks.background;

  const handleConfirm = () => {
    if (canApprove) {
      onConfirm();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
      />

      {/* Modal Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-6 overflow-hidden text-slate-800"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Banner Logo */}
        <div className="flex flex-col items-center text-center mt-2 mb-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 mb-3">
            <CheckCircle size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Approve Application</h3>
          <p className="text-sm text-slate-500 mt-1">
            You are about to activate <span className="font-semibold text-slate-700">{technicianName}</span> as a service provider.
          </p>
        </div>

        {/* Verification Checkbox Checklist */}
        <div className="space-y-3 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">Verification Checklist</p>
          
          <label className="flex items-start gap-3 cursor-pointer group select-none">
            <input
              type="checkbox"
              checked={checks.identity}
              onChange={(e) => setChecks({ ...checks, identity: e.target.checked })}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span className="text-xs font-medium text-slate-600 group-hover:text-slate-800 transition-colors leading-tight">
              Aadhaar and PAN details match the technician name and date of birth.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group select-none">
            <input
              type="checkbox"
              checked={checks.license}
              onChange={(e) => setChecks({ ...checks, license: e.target.checked })}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span className="text-xs font-medium text-slate-600 group-hover:text-slate-800 transition-colors leading-tight">
              Professional credentials or skills training licenses have been verified.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group select-none">
            <input
              type="checkbox"
              checked={checks.background}
              onChange={(e) => setChecks({ ...checks, background: e.target.checked })}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span className="text-xs font-medium text-slate-600 group-hover:text-slate-800 transition-colors leading-tight">
              Preliminary background check and reference checks are complete.
            </span>
          </label>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold hover:bg-slate-50 transition-colors cursor-pointer text-slate-600 text-center"
          >
            Cancel
          </button>
          
          <button
            onClick={handleConfirm}
            disabled={!canApprove}
            className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
              canApprove
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-slate-300 cursor-not-allowed"
            }`}
          >
            <ShieldCheck size={16} />
            Confirm Approval
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ApprovalModal;
