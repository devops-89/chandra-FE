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

      <div className="overflow-x-auto">
        <table className="w-full min-width:560px">
          <thead className="bg-emerald-600 text-white">
            <tr>
              <th className="p-4 text-left">Service</th>
              <th className="p-4 text-left">Previous %</th>
              <th className="p-4 text-left">New %</th>
              <th className="p-4 text-left">Updated By</th>
              <th className="p-4 text-left">Updated At</th>
            </tr>
          </thead>

          <tbody>
            {commissionHistoryData.map((history) => (
              <tr key={history.id}>
                <td className="p-4 font-medium text-slate-700">{history.serviceName}</td>
                <td className="p-4">
                  <span className="rounded-full bg-red-50 px-3 py-1 text-sm text-red-600">
                    {history.oldCommission}%
                  </span>
                </td>
                <td className="p-4">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-600">
                    {history.newCommission}%
                  </span>
                </td>
                <td className="p-4 text-slate-700">{history.updatedBy}</td>
                <td className="p-4 text-slate-700">{history.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommissionHistory;
