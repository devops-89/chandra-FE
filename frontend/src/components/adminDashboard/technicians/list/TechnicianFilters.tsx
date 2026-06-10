const TechnicianFilters = () => {
  return (
    <div className="rounded-2xl bg-white p-4">
      <div className="flex flex-wrap gap-2">
        <input
          placeholder="Search technicians..."
          className="h-11 flex-1 rounded-xl border border-slate-400 px-4"
        />

        <select className="h-11 rounded-xl border border-slate-400 px-4">
          <option>All Status</option>
          <option>Active</option>
          <option>Pending</option>
          <option>Suspended</option>
        </select>

        <select className="h-11 rounded-xl border border-slate-400 px-4">
          <option>All Skills</option>
          <option>Electrical</option>
          <option>Plumbing</option>
          <option>Cleaning</option>
        </select>
      </div>
    </div>
  );
};

export default TechnicianFilters;