interface Props {
  open: boolean;
  onClose: () => void;
  onAssign?: () => void;
}

const AssignComplaintModal = ({
  open,
  onClose,
  onAssign,
}: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="mb-2 text-xl font-semibold">
          Assign Complaint
        </h2>

        <p className="mb-6 text-sm text-slate-500">
          Assign this complaint to a support executive.
        </p>

        <div className="space-y-4">
          <select className="w-full rounded-xl border border-slate-200 p-3">
            <option>Select Support Executive</option>
            <option>Rahul Gupta</option>
            <option>Aman Verma</option>
            <option>Priya Singh</option>
          </select>

          <textarea
            rows={4}
            placeholder="Internal Notes"
            className="w-full rounded-xl border border-slate-200 p-3"
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={onAssign}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-white"
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignComplaintModal;