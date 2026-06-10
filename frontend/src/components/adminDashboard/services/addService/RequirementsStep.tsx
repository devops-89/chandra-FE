const RequirementsStep = () => {
  return (
    <div className="space-y-4 border-t pt-6">
      <h2 className="text-lg font-semibold text-slate-900">
        Requirements
      </h2>

      <input
        placeholder="Required Skills"
        className="w-full rounded-xl border border-slate-200 p-3"
      />

      <textarea
        rows={3}
        placeholder="Required Tools"
        className="w-full rounded-xl border border-slate-200 p-3"
      />

      <textarea
        rows={4}
        placeholder="Booking Questions"
        className="w-full rounded-xl border border-slate-200 p-3"
      />
    </div>
  );
};

export default RequirementsStep;