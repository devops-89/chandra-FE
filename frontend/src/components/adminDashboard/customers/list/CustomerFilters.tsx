const CustomerFilters = () => {
  return (
    <div className="rounded-2xl border bg-white p-4">
      <div className="flex flex-wrap gap-4">
        <input
          placeholder="Search customers..."
          className="h-11 flex-1 rounded-xl border px-4"
        />

        <select className="h-11 rounded-xl border px-4">
          <option>All Cities</option>
          <option>Noida</option>
          <option>Delhi</option>
          <option>Gurgaon</option>
        </select>

        <select className="h-11 rounded-xl border px-4">
          <option>All Status</option>
          <option>Active</option>
          <option>Blocked</option>
        </select>
      </div>
    </div>
  );
};

export default CustomerFilters;