interface Props {
  open: boolean;
  currentTechnician?: string;
  onClose: () => void;
  onConfirm?: () => void;
}

const ReassignTechnicianModal = ({
  open,
  currentTechnician,
  onClose,
  onConfirm,
}: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Reassign Technician
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Change the technician assigned to this booking.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Current Technician
            </label>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              {currentTechnician || "Arjun Sharma"}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              New Technician
            </label>

            <select className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-emerald-500">
              <option>Select Technician</option>
              <option>Rahul Kumar</option>
              <option>Vikram Singh</option>
              <option>Aman Verma</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Reason
            </label>

            <textarea
              rows={3}
              placeholder="Reason for reassignment..."
              className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2 font-medium"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-xl bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700"
          >
            Reassign
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReassignTechnicianModal;