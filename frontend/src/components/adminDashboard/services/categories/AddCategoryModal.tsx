interface Props {
  open: boolean;
  onClose: () => void;
}

const AddCategoryModal = ({
  open,
  onClose,
}: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6">
        <h2 className="mb-5 text-xl font-semibold">
          Add Category
        </h2>

        <input
          placeholder="Category Name"
          className="mb-4 w-full rounded-xl border p-3"
        />

        <textarea
          rows={3}
          placeholder="Description"
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
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;