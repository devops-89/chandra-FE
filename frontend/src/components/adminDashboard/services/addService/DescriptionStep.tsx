const DescriptionStep = () => {
  return (
    <div className="space-y-4 border-t pt-6">
      <h2 className="text-lg font-semibold text-slate-900">
        Description & Media
      </h2>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Short Description
        </label>

        <textarea
          rows={4}
          placeholder="Describe the service..."
          className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-emerald-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Service Image
        </label>

        <div className="flex h-40 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50">
          Upload Image
        </div>
      </div>
    </div>
  );
};

export default DescriptionStep;