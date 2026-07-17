interface Props {
  open: boolean;
  onClose: () => void;
  onRefund?: () => void;
}

const RefundModal = ({
  open,
  onClose,
  onRefund,
}: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="mb-2 text-xl font-semibold text-red-600">
          Process Refund
        </h2>

        <p className="mb-6 text-sm text-slate-500">
          Issue a refund to the customer.
        </p>

        <div className="space-y-4">
          <input
            type="number"
            placeholder="Refund Amount"
            className="w-full rounded-xl border border-slate-200 p-3"
          />

          <select className="w-full rounded-xl border border-slate-200 p-3">
            <option>Select Refund Reason</option>
            <option>Service Quality Issue</option>
            <option>Technician No Show</option>
            <option>Booking Cancelled</option>
            <option>Customer Compensation</option>
          </select>

          <textarea
            rows={4}
            placeholder="Refund Notes"
            className="w-full rounded-xl border border-slate-200 p-3"
          />
        </div>

        <div className="mt-6 rounded-xl bg-red-50 p-4">
          <p className="text-sm text-red-700">
            This action will initiate a refund and notify the customer.
          </p>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={onRefund}
            className="rounded-xl bg-red-600 px-4 py-2 text-white"
          >
            Process Refund
          </button>
        </div>
      </div>
    </div>
  );
};

export default RefundModal;