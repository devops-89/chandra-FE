const ServiceFilters = () => {
  return (
    <div className="rounded-2xl bg-white p-4">
      <div className="flex flex-wrap gap-4">
        <input
          placeholder="Search services..."
          className="h-11 flex-1 rounded-xl border border-slate-400 px-4 outline-none"
        />

        <select className="h-11 rounded-xl border border-slate-400 px-4">
          <option>All Categories</option>
          <option>Electrical</option>
          <option>Plumbing</option>
          <option>Cleaning</option>
        </select>

        <select className="h-11 rounded-xl border border-slate-400 px-4">
          <option>Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>
    </div>
  );
};

export default ServiceFilters;