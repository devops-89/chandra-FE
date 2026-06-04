export default function HistoryPreview() {
  return (
    <section
      className="
        rounded-3xl
        bg-white
        p-6
        shadow-sm
      "
    >
      <h2 className="mb-6 text-xl font-bold">
        Recent History
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span>AC Servicing</span>

          <span className="text-emerald-600">
            Completed
          </span>
        </div>

        <div className="flex justify-between">
          <span>Plumbing</span>

          <span className="text-emerald-600">
            Completed
          </span>
        </div>

        <div className="flex justify-between">
          <span>Electrical Repair</span>

          <span className="text-emerald-600">
            Completed
          </span>
        </div>
      </div>
    </section>
  );
}   