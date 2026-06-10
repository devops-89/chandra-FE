interface Props {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteServiceModal = ({
  open,
  onClose,
  onDelete,
}: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white p-6">
        <h2 className="text-xl font-semibold">
          Delete Service
        </h2>

        <p className="mt-3 text-slate-500">
          Are you sure you want to delete this
          service?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="rounded-xl bg-red-600 px-4 py-2 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteServiceModal;