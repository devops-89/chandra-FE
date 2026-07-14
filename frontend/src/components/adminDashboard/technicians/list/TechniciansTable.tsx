import type { Technician } from "@/constants/admin/technicianData";

import TechnicianCard from "./TechnicianCard";

type StatusTab = "All Status" | "Active" | "Pending" | "Suspended";

interface TabConfig {
  id: StatusTab;
  label: string;
  dotColor?: string;
}

const STATUS_TABS: TabConfig[] = [
  { id: "All Status", label: "All" },
  { id: "Active", label: "Active", dotColor: "bg-green-400" },
  { id: "Pending", label: "Pending", dotColor: "bg-yellow-400" },
  { id: "Suspended", label: "Suspended", dotColor: "bg-red-400" },
];

interface Props {
  technicians: Technician[];
  allTechnicians: Technician[];
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  onToggleSuspend: (id: string) => void;
  onViewDetails?: (technician: Technician) => void;
}

const TechniciansTable = ({
  technicians,
  allTechnicians,
  statusFilter,
  setStatusFilter,
  onToggleSuspend,
  onViewDetails,
}: Props) => {
  const getCount = (id: StatusTab) => {
    if (id === "All Status") return allTechnicians.length;
    return allTechnicians.filter((t) => t.status === id).length;
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {/* Header */}
      <div className="px-5 pt-5 pb-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-black text-2xl">Current Technicians</h2>
          <p className="text-xs text-black">
            Total of{" "}
            <span className="text-emerald-700">{technicians.length} technician </span>
            records found
          </p>
        </div>

        {/* Tab pills — same style as BookingTabs */}
        <nav className="flex items-center gap-1 flex-wrap">
          {STATUS_TABS.map((tab) => {
            const isActive = statusFilter === tab.id;
            const count = getCount(tab.id);
            return (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`relative flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                {tab.dotColor && (
                  <span
                    className={`h-2 w-2 rounded-full shrink-0 ${
                      isActive ? "bg-white/70" : tab.dotColor
                    }`}
                  />
                )}
                {tab.label}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[11px] font-semibold leading-none ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </nav>
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

