const CustomerOverview = () => {
  return (
    <div className="rounded-2xl border bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold">
        Customer Overview
      </h3>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-slate-500">
            Total Bookings
          </p>

          <h4 className="text-2xl font-bold">
            18
          </h4>
        </div>

        <div>
          <p className="text-slate-500">
            Total Spent
          </p>

          <h4 className="text-2xl font-bold">
            ₹8,450
          </h4>
        </div>
      </div>
    </div>
  );
};

export default CustomerOverview;