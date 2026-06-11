import ServiceCommissionTable from './ServiceCommissionTable'
const CommissionSettings = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-white p-6">
        <h2 className="text-xl font-semibold">
          Global Commission
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Default commission applied to all services.
        </p>

        <div className="mt-5 flex items-center gap-4">
          <input
            type="number"
            defaultValue={15}
            className="w-40 rounded-xl border p-3"
          />

          <span>%</span>

          <button className="rounded-xl bg-emerald-600 px-5 py-3 hover:bg-emerald-700 cursor-pointer text-white">
            Save
          </button>
        </div>
      </div>

      <ServiceCommissionTable />
    </div>
  );
};

export default CommissionSettings;