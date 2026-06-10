interface Props {
  open: boolean;
  onClose: () => void;
}

const AssignTechnicianModal = ({
  open,
  onClose,
}: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6">
        <h2 className="mb-5 text-xl font-semibold">
          Assign Technician
        </h2>

        <select className="mb-4 w-full rounded-xl border p-3">
          <option>Select Technician</option>
        </select>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border px-4 py-2"
          >
            Cancel
          </button>

          <button className="rounded-xl bg-emerald-600 px-4 py-2 text-white">
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignTechnicianModal;