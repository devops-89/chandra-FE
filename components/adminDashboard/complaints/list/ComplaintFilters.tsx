const ComplaintFilters = () => {
  return (
    <div className="rounded-2xl bg-white p-4">
      <div className="flex flex-wrap gap-2">
        <input
          placeholder="Search complaint..."
          className="h-11 flex-1 rounded-xl border border-slate-400 px-4"
        />

        <select className="h-11 rounded-xl border border-slate-400 px-4">
          <option>All Status</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>

        <select className="h-11 rounded-xl border border-slate-400 px-4">
          <option>All Priority</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>
    </div>
  );
};

export default ComplaintFilters;