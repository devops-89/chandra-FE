const PricingStep = () => {
  return (
    <div className="space-y-4 border-t pt-6">
      <h2 className="text-lg font-semibold text-slate-900">
        Pricing
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <select className="rounded-xl border border-slate-200 p-3">
          <option>Pricing Type</option>
          <option>Fixed Price</option>
          <option>Starting Price</option>
          <option>Inspection Based</option>
        </select>

        <input
          type="number"
          placeholder="Base Price"
          className="rounded-xl border border-slate-200 p-3"
        />
      </div>

      <input
        placeholder="Duration (e.g. 60 mins)"
        className="w-full rounded-xl border border-slate-200 p-3"
      />
    </div>
  );
};

export default PricingStep;