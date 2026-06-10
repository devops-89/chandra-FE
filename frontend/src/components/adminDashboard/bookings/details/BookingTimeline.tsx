const steps = [
  "Booking Created",
  "Assigned",
  "On The Way",
  "In Progress",
  "Completed",
];

const BookingTimeline = () => {
  return (
    <div className="rounded-2xl border bg-white p-6">
      <h3 className="mb-5 text-lg font-semibold">
        Booking Timeline
      </h3>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={step}
            className="flex items-center gap-4"
          >
            <div
              className={`h-4 w-4 rounded-full ${
                index < 3
                  ? "bg-emerald-600"
                  : "bg-slate-300"
              }`}
            />

            <p>{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingTimeline;