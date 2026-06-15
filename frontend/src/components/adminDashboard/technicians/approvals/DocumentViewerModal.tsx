"use client";

import { motion } from "framer-motion";
import { FileText, ShieldCheck,X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  documentName: string;
  technicianName: string;
}

const DocumentViewerModal = ({ open, onClose, documentName, technicianName }: Props) => {
  if (!open) return null;

  const getDocId = () => {
    if (documentName.includes("Aadhaar")) return "1208 9453 7721";
    if (documentName.includes("PAN")) return "BYKPS 8392 K";
    return "LIC-2026-94021";
  };

  const getDocType = () => {
    if (documentName.includes("Aadhaar")) return "Aadhaar Card";
    if (documentName.includes("PAN")) return "PAN Card (Permanent Account Number)";
    return "Trade License & Trade Certification";
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

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 p-5 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700">
              <FileText size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">{getDocType()}</h3>
              <p className="text-xs text-slate-500">Applicant: {technicianName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 bg-slate-100 flex flex-col items-center justify-center min-h-[350px]">
          {/* Card Mockup rendering */}
          {documentName.includes("Aadhaar") && (
            <div className="w-full max-w-md bg-white border border-slate-300 shadow-md rounded-xl p-5 relative overflow-hidden flex flex-col justify-between aspect-video select-none text-slate-800">
              {/* Top Banner */}
              <div className="flex items-center justify-between border-b pb-2 mb-3">
                <div className="text-[10px] font-bold text-orange-600 uppercase">भारत सरकार</div>
                <div className="text-[10px] font-bold text-emerald-700 uppercase">GOVERNMENT OF INDIA</div>
              </div>

              {/* Main Body */}
              <div className="flex gap-4">
                {/* Photo Placeholder */}
                <div className="w-24 h-28 bg-slate-200 border border-slate-300 rounded flex flex-col items-center justify-center relative shrink-0">
                  <div className="w-16 h-16 rounded-full bg-slate-400 flex items-center justify-center text-white font-bold text-2xl">
                    {technicianName[0]}
                  </div>
                  <div className="absolute bottom-1 text-[8px] bg-slate-500 text-white px-1 rounded-sm">Verified Photo</div>
                </div>

                {/* Identity Info */}
                <div className="space-y-1 text-xs">
                  <div>
                    <span className="text-slate-400 font-medium block text-[9px] uppercase">Name</span>
                    <span className="font-bold">{technicianName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block text-[9px] uppercase">DOB / Year</span>
                    <span className="font-semibold">15/08/1996</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block text-[9px] uppercase">Gender</span>
                    <span className="font-semibold">Male</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block text-[9px] uppercase">Unique ID</span>
                    <span className="font-bold tracking-widest text-emerald-800 text-sm">{getDocId()}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Info */}
              <div className="border-t pt-2 mt-3 flex justify-between items-center text-[8px] text-slate-500 font-medium">
                <span>Unique Identification Authority of India</span>
                <span className="flex items-center gap-0.5 text-emerald-600">
                  <ShieldCheck size={10} /> Aadhaar Verified
                </span>
              </div>
            </div>
          )}

          {documentName.includes("PAN") && (
            <div className="w-full max-w-md bg-gradient-to-tr from-sky-900 to-indigo-950 border border-sky-800 shadow-xl rounded-xl p-5 relative overflow-hidden flex flex-col justify-between aspect-video select-none text-white font-sans">
              {/* Header */}
              <div className="flex justify-between items-start border-b border-white/10 pb-2 mb-2">
                <div>
                  <h4 className="text-[10px] font-bold text-sky-300">आयकर विभाग</h4>
                  <p className="text-[8px] text-white/60 tracking-wider">INCOME TAX DEPARTMENT</p>
                </div>
                <div className="text-right">
                  <h4 className="text-[10px] font-bold text-sky-300">भारत सरकार</h4>
                  <p className="text-[8px] text-white/60">GOVT. OF INDIA</p>
                </div>
              </div>

              {/* Body */}
              <div className="flex justify-between items-center my-2">
                <div className="space-y-2">
                  <div>
                    <p className="text-[8px] text-sky-200/60 uppercase">Permanent Account Number (PAN)</p>
                    <p className="text-sm font-bold tracking-widest text-amber-400">{getDocId()}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    <div>
                      <p className="text-[8px] text-sky-200/60 uppercase">Name</p>
                      <p className="text-[10px] font-semibold">{technicianName.toUpperCase()}</p>
                    </div>
                    <div>
                      <p className="text-[8px] text-sky-200/60 uppercase">Date of Birth</p>
                      <p className="text-[10px] font-semibold">15/08/1996</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-1.5 shrink-0">
                  {/* Styled Avatar */}
                  <div className="w-16 h-20 bg-white/10 border border-white/20 rounded flex items-center justify-center text-white/40 font-bold text-xl">
                    {technicianName[0]}
                  </div>
                  {/* Signature block */}
                  <div className="w-20 h-6 bg-amber-50/10 border border-dashed border-amber-500/30 rounded flex items-center justify-center text-[9px] text-amber-200 font-serif italic font-semibold">
                    {technicianName.split(" ")[0]}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="text-[8px] text-white/35 text-center mt-2 border-t border-white/5 pt-1">
                This card is digitally verified. Unauthorized use is subject to prosecution.
              </div>
            </div>
          )}

          {!documentName.includes("Aadhaar") && !documentName.includes("PAN") && (
            <div className="w-full max-w-lg bg-white border-8 border-double border-emerald-800 shadow-xl rounded-xl p-8 relative overflow-hidden flex flex-col justify-between select-none text-slate-800 font-serif aspect-[4/3]">
              {/* Header Seal */}
              <div className="text-center space-y-1">
                <div className="mx-auto w-12 h-12 rounded-full border-2 border-emerald-800 flex items-center justify-center text-emerald-800 font-sans font-black text-xl mb-1">
                  ★
                </div>
                <h3 className="text-lg font-bold tracking-wider text-emerald-900 uppercase">NATIONAL TECHNICAL COUNCIL</h3>
                <p className="text-[9px] uppercase tracking-widest text-slate-500 font-sans">Ministry of Skill Development & Licensing</p>
              </div>

              {/* Certificate content */}
              <div className="my-6 text-center space-y-4 font-serif">
                <p className="text-xs italic text-slate-600">This is to certify that</p>
                <h2 className="text-xl font-bold text-emerald-800 uppercase tracking-wide border-b border-emerald-800/20 pb-1 w-fit mx-auto px-4">
                  {technicianName}
                </h2>
                <p className="text-xs leading-relaxed max-w-sm mx-auto text-slate-700">
                  has successfully satisfied all professional qualification benchmarks and holds valid state clearance as an
                  <span className="font-bold text-slate-900"> Electrical & Home Systems Technician</span>.
                </p>
              </div>

              {/* Signatures */}
              <div className="flex justify-between items-end text-xs font-sans mt-4 pt-4 border-t border-slate-100">
                <div className="text-center space-y-1">
                  <div className="h-6 w-20 border-b border-slate-300 mx-auto font-serif italic text-slate-400">J. R. Roy</div>
                  <p className="text-[8px] text-slate-400 font-bold uppercase">Registrar Signature</p>
                </div>
                <div className="text-center space-y-1">
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">VERIFIED</span>
                  <p className="text-[8px] text-slate-400 font-bold uppercase">License No: {getDocId()}</p>
                </div>
                <div className="text-center space-y-1">
                  <div className="h-6 w-20 border-b border-slate-300 mx-auto font-serif italic text-slate-400">P. K. Sen</div>
                  <p className="text-[8px] text-slate-400 font-bold uppercase">Inspector Signature</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between border-t border-slate-100 p-4 bg-slate-50/50">
          <div className="flex items-center gap-1.5 text-emerald-700 font-medium text-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Verified via Digital Locker API Integration
          </div>
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-2 hover:bg-white text-slate-700 text-sm font-semibold shadow-xs cursor-pointer transition-colors"
          >
            Close Document
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DocumentViewerModal;
