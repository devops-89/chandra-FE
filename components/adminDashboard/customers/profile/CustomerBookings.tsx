const CustomerBookings = () => {
  return (
    <div className="rounded-2xl bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold">
        Recent Bookings
      </h3>

      <div className="space-y-3">
        <div className="rounded-xl border p-4">
          AC Repair - ₹499
        </div>

        <div className="rounded-xl border p-4">
          Solar Cleaning - ₹899
        </div>

        <div className="rounded-xl border p-4">
          Pipe Leakage - ₹299
        </div>
      </div>
    </div>
  );
};

export default CustomerBookings;