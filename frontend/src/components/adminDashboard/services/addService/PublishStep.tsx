const PublishStep = () => {
  return (
    <div className="space-y-4 border-t pt-6">
      <h2 className="text-lg font-semibold text-slate-900">
        Publish Settings
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <select className="rounded-xl border border-slate-200 p-3">
          <option>Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <input
          placeholder="Available Cities"
          className="rounded-xl border border-slate-200 p-3"
        />
      </div>
    </div>
  );
};

export default PublishStep;