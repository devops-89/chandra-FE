import type { Technician } from "@/constants/admin/technicianData";

import TechnicianCard from "./TechnicianCard";

interface Props {
  technicians: Technician[];
  onToggleSuspend: (id: string) => void;
  onViewDetails?: (technician: Technician) => void;
}

const TechniciansTable = ({ technicians, onToggleSuspend, onViewDetails }: Props) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white ">
      <div className="p-5 bg-emerald-600 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-white">Current Technicians</h2>
          <p className="text-xs text-white mt-0.5">
            Total of {technicians.length} technician records found
          </p>
        </div>
      </div>

      {technicians.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <p className="text-slate-400 text-sm">No technicians match your search filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {technicians.map((technician) => (
            <TechnicianCard
              key={technician.id}
              technician={technician}
              onToggleSuspend={onToggleSuspend}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TechniciansTable;
