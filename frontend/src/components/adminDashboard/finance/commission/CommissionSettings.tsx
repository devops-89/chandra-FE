import ServiceCommissionTable from './ServiceCommissionTable';

const CommissionSettings = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-100 bg-white p-6">
        <h2 className="text-xl font-semibold">Global Commission</h2>

        <p className="mt-2 text-sm text-slate-500">
          Default commission applied to all services.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <input
            type="number"
            defaultValue={15}
            className="w-32 sm:w-40 rounded-xl border border-slate-200 p-3"
          />

          <span>%</span>

          <button className="rounded-xl bg-emerald-600 px-5 py-3 hover:bg-emerald-700 cursor-pointer text-white transition-colors">
            Save
          </button>
        </div>
      </div>

      <ServiceCommissionTable />
    </div>
  );
};

export default CommissionSettings;
