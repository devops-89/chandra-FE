interface Props {
  open: boolean;
  onClose: () => void;
  onResolve?: () => void;
}

const ResolveComplaintModal = ({
  open,
  onClose,
  onResolve,
}: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="mb-2 text-xl font-semibold">
          Resolve Complaint
        </h2>

        <p className="mb-6 text-sm text-slate-500">
          Mark complaint as resolved.
        </p>

        <div className="space-y-4">
          <textarea
            rows={5}
            placeholder="Resolution Summary"
            className="w-full rounded-xl border border-slate-200 p-3"
          />

          <select className="w-full rounded-xl border border-slate-200 p-3">
            <option>Select Resolution Type</option>
            <option>Issue Fixed</option>
            <option>Revisit Scheduled</option>
            <option>Refund Processed</option>
            <option>Customer Satisfied</option>
          </select>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={onResolve}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-white"
          >
            Resolve Complaint
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResolveComplaintModal;