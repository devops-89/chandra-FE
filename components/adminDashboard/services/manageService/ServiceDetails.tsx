
const ServiceDetails = () => {

  return (
    <div className="rounded-2xl border bg-white p-6">
      <div className="mb-6 flex items-center gap-4">
        <div className="h-20 w-20 rounded-xl bg-slate-200" />

        <div>
          <h2 className="text-2xl font-bold">
            AC Repair
          </h2>

          <p className="text-slate-500">
            Appliance Repair
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h4 className="font-medium">
            Pricing
          </h4>

          <p>₹499</p>
        </div>

        <div>
          <h4 className="font-medium">
            Duration
          </h4>

          <p>60 Minutes</p>
        </div>

        <div>
          <h4 className="font-medium">
            Status
          </h4>

          <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">
            Active
          </span>
        </div>

        <div>
          <h4 className="font-medium">
            Total Bookings
          </h4>

          <p>154</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;