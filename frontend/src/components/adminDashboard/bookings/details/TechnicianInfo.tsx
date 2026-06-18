interface Props {
  technician: string;
}

const TechnicianInfo = ({ technician }: Props) => {
  const hasTechnician = technician && technician !== '-';

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold text-slate-900">Technician Information</h3>

      {hasTechnician ? (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm shrink-0">
              {technician
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)}
            </div>
            <div>
              <p className="font-semibold text-slate-900 text-sm">{technician}</p>
              <p className="text-xs text-slate-500">Assigned Technician</p>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3 space-y-1.5">
            <p className="text-sm text-slate-600">
              <span className="text-slate-400 text-xs uppercase tracking-wider">Status</span>
              <span className="ml-2 inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                Active
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-4 text-center">
          <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center mb-2">
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <p className="text-sm text-slate-400 italic">No technician assigned</p>
        </div>
      )}
    </div>
  );
};

export default TechnicianInfo;