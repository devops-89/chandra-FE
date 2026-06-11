interface Props {
  open: boolean;
  onClose: () => void;
}

const EditCommissionModal = ({
  open,
  onClose,
}: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">
          Update Commission
        </h2>

        <input
          type="number"
          defaultValue={15}
          className="mb-4 w-full rounded-xl border p-3"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border px-4 py-2"
          >
            Cancel
          </button>

          <button className="rounded-xl bg-emerald-600 px-4 py-2 text-white">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCommissionModal;