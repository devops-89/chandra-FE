"use client";

interface Props {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  categoryName: string;
}

const DeleteCategoryModal = ({
  open,
  onClose,
  onDelete,
  categoryName,
}: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white p-6">
        <h2 className="mb-3 text-xl font-semibold text-red-600">
          Delete Category
        </h2>

        <p className="mb-6 text-slate-500">
          Are you sure you want to delete{" "}
          <span className="font-medium">
            {categoryName}
          </span>
          ?
        </p>

        <div className="flex justify-end gap-3">
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

export default DeleteCategoryModal;