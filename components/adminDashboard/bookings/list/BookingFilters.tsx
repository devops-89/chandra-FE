const BookingFilters = () => {
  return (
    <div className="rounded-2xl bg-white p-4">
      <div className="flex flex-wrap gap-4">
        <input
          placeholder="Search Booking ID..."
          className="h-11 flex-1 rounded-xl border border-slate-400 px-4"
        />

        <select className="h-11 rounded-xl border border-slate-400 px-4">
          <option>All Status</option>
          <option>Pending</option>
          <option>Assigned</option>
          <option>Completed</option>
        </select>

        <select className="h-11 rounded-xl border border-slate-400 px-4">
          <option>All Services</option>
        </select>
      </div>
    </div>
  );
};

export default BookingFilters;