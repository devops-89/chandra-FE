import { commissionHistoryData } from "@/constants/admin/commissionHistoryData";

const CommissionHistory = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-400 bg-white">
      <div className="border-b p-5">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Commission History
          </h3>
          <p className="mt-1 text-sm text-slate-700">
            Track all commission changes made by admins.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {commissionHistoryData.map((history) => (
          <div
            key={history.id}
            className="border border-slate-200 rounded-2xl bg-white p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between cursor-default"
          >
            <div>
              <h4 className="font-semibold text-slate-900 leading-snug">
                {history.serviceName}
              </h4>
              
              <div className="flex items-center gap-3 mt-4">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Was</p>
                  <span className="inline-block rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-600 mt-1">
                    {history.oldCommission}%
                  </span>
                </div>
                
                <span className="text-slate-400 font-medium text-lg mt-3">→</span>
                
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Now</p>
                  <span className="inline-block rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 mt-1">
                    {history.newCommission}%
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 mt-4 pt-3 flex items-center justify-between text-xs text-slate-500">
              <span>By {history.updatedBy}</span>
              <span>{history.updatedAt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommissionHistory;
