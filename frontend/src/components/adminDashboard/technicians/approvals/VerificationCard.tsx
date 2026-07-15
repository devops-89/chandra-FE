import { ArrowRight, Calendar, ClipboardCheck, MapPin } from "lucide-react";

import type { Technician } from "@/constants/admin/technicianData";

interface Props {
  technician: Technician;
  onApprove: () => void;
  onReject: () => void;
  onReview: () => void;
}

const VerificationCard = ({ technician, onApprove, onReject, onReview }: Props) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Profile Info */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 text-xl font-bold shrink-0">
            {technician.name[0]}
          </div>

          <div className="space-y-1">
            <h3 className="font-semibold text-slate-800 text-lg leading-tight">{technician.name}</h3>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <MapPin size={12} className="text-slate-400" />
                {technician.city}
              </span>
              <span className="flex items-center gap-1">
                <ClipboardCheck size={12} className="text-slate-400" />
                {technician.experience} Years Experience
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={12} className="text-slate-400" />
                Applied {technician.appliedAt}
              </span>
            </div>
          </div>
        </div>

        {/* Action button options */}
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <button
            onClick={onApprove}
            className="rounded-xl bg-emerald-600 hover:bg-emerald-700 px-4 py-2 cursor-pointer text-white text-xs font-semibold shadow-xs transition-colors"
          >
            Approve
          </button>

          <button
            onClick={onReject}
            className="rounded-xl border border-slate-200 hover:bg-slate-50 px-4 py-2 cursor-pointer text-slate-600 text-xs font-semibold transition-colors"
          >
            Reject
          </button>

          <button
            onClick={onReview}
            className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 cursor-pointer text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            Review Details
            <ArrowRight size={12} />
          </button>
        </div>
      </div>

      {/* Skills tags */}
      <div className="mt-4 flex flex-wrap gap-1.5 border-t border-slate-100 pt-3">
        {technician.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-lg bg-slate-50 px-2 py-0.5 text-xs text-slate-600 border border-slate-100"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default VerificationCard;
