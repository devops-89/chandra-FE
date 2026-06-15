interface Props {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  skillFilter: string;
  setSkillFilter: (val: string) => void;
}

const TechnicianFilters = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  skillFilter,
  setSkillFilter,
}: Props) => {
  return (
    <div className="rounded-2xl bg-white p-4 border border-slate-200">
      <div className="flex flex-col md:flex-row gap-3">
        <input
          placeholder="Search technicians by name, email, city..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-11 flex-1 rounded-xl border border-slate-300 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-sm"
        />

        <div className="flex gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-11 flex-1 md:w-44 rounded-xl border border-slate-300 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-sm cursor-pointer"
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Suspended</option>
          </select>

          <select
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value)}
            className="h-11 flex-1 md:w-44 rounded-xl border border-slate-300 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-sm cursor-pointer"
          >
            <option>All Skills</option>
            <option>Electrical</option>
            <option>Plumbing</option>
            <option>Cleaning</option>
            <option>AC Repair</option>
            <option>Solar Cleaning</option>
            <option>EV Charger</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TechnicianFilters;