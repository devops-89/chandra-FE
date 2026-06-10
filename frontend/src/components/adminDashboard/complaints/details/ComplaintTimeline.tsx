const timeline = [
  "Complaint Created",
  "Assigned To Support",
  "Investigation Started",
  "Customer Contacted",
  "Resolved",
];

const ComplaintTimeline = () => {
  return (
    <div className="rounded-2xl border bg-white p-6">
      <h3 className="mb-5 text-lg font-semibold">
        Complaint Timeline
      </h3>

      <div className="space-y-4">
        {timeline.map((item, index) => (
          <div
            key={item}
            className="flex items-center gap-4"
          >
            <div
              className={`h-4 w-4 rounded-full ${
                index <= 2
                  ? "bg-emerald-600"
                  : "bg-slate-300"
              }`}
            />

            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplaintTimeline;