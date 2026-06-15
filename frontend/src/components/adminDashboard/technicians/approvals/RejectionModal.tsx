"use client";

import { motion } from "framer-motion";
import { AlertTriangle,X } from "lucide-react";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: (reason: string, notes: string) => void;
  technicianName: string;
}

const RejectionModal = ({ open, onClose, onConfirm, technicianName }: Props) => {
  const [reason, setReason] = useState("Invalid or unclear document photos");
  const [notes, setNotes] = useState("");

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reason) {
      onConfirm(reason, notes);
      onClose();
    }
  };

  const predefinedReasons = [
    "Invalid or unclear document photos",
    "Aadhaar / PAN name mismatch",
    "Insufficient verified experience",
    "Failed background audit check",
    "Other (Specify in notes below)",
  ];

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
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-red-600 mb-3">
            <AlertTriangle size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Reject Application</h3>
          <p className="text-sm text-slate-500 mt-1">
            Specify why <span className="font-semibold text-slate-700">{technicianName}</span>'s application is being rejected.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Rejection Reason
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full h-11 rounded-xl border border-slate-300 px-3 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 cursor-pointer"
            >
              {predefinedReasons.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Additional Feedback / Notes
            </label>
            <textarea
              placeholder="Provide constructive feedback for the applicant..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 resize-none"
            />
          </div>

          {/* Warning Note */}
          <p className="text-[11px] text-red-600/80 leading-relaxed bg-red-50/50 p-3 rounded-lg border border-red-100/30">
            * Note: This will set the technician's status to <strong>Suspended</strong>. The applicant will receive an automated email containing these comments.
          </p>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold hover:bg-slate-50 transition-colors cursor-pointer text-slate-600 text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-red-600 hover:bg-red-700 px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors flex items-center justify-center cursor-pointer"
            >
              Reject Application
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default RejectionModal;
