import { AlertCircle, Ban, CheckCircle, MapPin, Star, User } from "lucide-react";

import type { Technician } from "@/constants/admin/technicianData";

interface Props {
  technician: Technician;
  onToggleSuspend: (id: string) => void;
  onViewDetails?: (technician: Technician) => void;
}

const TechnicianCard = ({ technician, onToggleSuspend, onViewDetails }: Props) => {
  const isPending = technician.status === "Pending";
  const isActive = technician.status === "Active";
  const isSuspended = technician.status === "Suspended";

  return (
    <div className="border border-slate-200 rounded-2xl bg-[#F8FAFC] p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between cursor-default">
      <div>
        {/* Card Header: Initial avatar & Status */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-700 text-lg font-semibold shrink-0">
              {technician.name[0]}
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 leading-snug">
                {technician.name}
              </h4>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <MapPin size={12} className="text-slate-400" />
                {technician.city}
              </p>
            </div>
          </div>

          <span
            className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${isActive
                ? "bg-emerald-100 text-emerald-700"
                : isPending
                  ? "bg-yellow-100 text-yellow-700 animate-pulse"
                  : "bg-red-100 text-red-700"
              }`}
          >
            {isActive && <CheckCircle size={10} />}
            {isPending && <AlertCircle size={10} />}
            {isSuspended && <Ban size={10} />}
            {technician.status}
          </span>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 border-t border-b border-slate-100 my-4 py-3 text-center">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Experience</p>
            <p className="text-sm font-semibold text-slate-800 mt-1">{technician.experience} Yrs</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Rating</p>
            <p className="text-sm font-semibold text-slate-800 mt-1 flex items-center justify-center gap-0.5">
              <Star size={12} className="text-amber-500 fill-amber-500" />
              {technician.rating}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Jobs</p>
            <p className="text-sm font-semibold text-slate-800 mt-1">{technician.completedJobs}</p>
          </div>
        </div>

        {/* Skills list */}
        <div className="flex flex-wrap gap-1.5 mb-4">
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

      {/* Rejection / Suspension Notes if applicable */}
      {isSuspended && technician.rejectionReason && (
        <div className="mb-4 rounded-xl bg-red-50 p-2.5 text-xs text-red-700 border border-red-100">
          <p className="font-semibold">Reason: {technician.rejectionReason}</p>
          {technician.rejectionNotes && <p className="mt-0.5 opacity-80">{technician.rejectionNotes}</p>}
        </div>
      )}

      {/* Card Actions */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-3">
        <div>
          {!isPending && (
            <button
              onClick={() => onToggleSuspend(technician.id)}
              className={`text-xs font-semibold cursor-pointer hover:underline transition-colors ${isActive
                  ? "text-red-600 hover:text-red-700"
                  : "text-emerald-600 hover:text-emerald-700"
                }`}
            >
              {isActive ? "Suspend" : "Reactivate"}
            </button>
          )}
        </div>

        <button
          onClick={() => onViewDetails?.(technician)}
          className="flex items-center gap-1 text-emerald-600 hover:underline hover:text-emerald-700 font-semibold text-sm cursor-pointer transition-colors"
        >
          <User size={14} />
          {isPending ? "Review Application" : "View Profile"}
        </button>
      </div>
    </div>
  );
};

export default TechnicianCard;
