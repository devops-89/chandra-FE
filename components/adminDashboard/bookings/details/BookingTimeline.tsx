const steps = [
  'Booking Created',
  'Assigned',
  'On The Way',
  'In Progress',
  'Completed',
];

const statusStepMap: Record<string, number> = {
  Pending: 0,
  Assigned: 1,
  'In Progress': 3,
  Completed: 4,
  Cancelled: -1,
};

interface Props {
  status: string;
}

const BookingTimeline = ({ status }: Props) => {
  const activeStep = statusStepMap[status] ?? 0;
  const isCancelled = status === 'Cancelled';

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h3 className="mb-5 text-lg font-semibold text-slate-900">Booking Timeline</h3>

      {isCancelled ? (
        <div className="flex items-center gap-3 rounded-xl bg-red-50 border border-red-100 px-4 py-3">
          <div className="h-4 w-4 rounded-full bg-red-500 shrink-0" />
          <p className="text-sm font-medium text-red-700">Booking Cancelled</p>
        </div>
      ) : (
        <div className="space-y-4">
          {steps.map((step, index) => {
            const isCompleted = index <= activeStep;
            const isActive = index === activeStep;
            return (
              <div key={step} className="flex items-center gap-4">
                <div
                  className={`h-4 w-4 rounded-full shrink-0 transition-colors ${
                    isActive
                      ? 'bg-emerald-600 ring-4 ring-emerald-100'
                      : isCompleted
                      ? 'bg-emerald-600'
                      : 'bg-slate-200'
                  }`}
                />
                <p
                  className={`text-sm ${
                    isActive
                      ? 'font-semibold text-emerald-700'
                      : isCompleted
                      ? 'text-slate-700'
                      : 'text-slate-400'
                  }`}
                >
                  {step}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BookingTimeline;