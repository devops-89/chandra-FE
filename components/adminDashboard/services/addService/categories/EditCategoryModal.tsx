"use client";

import { useState } from "react";

import type { Category } from "@/types/admin/category.types";

interface Props {
  open: boolean;
  onClose: () => void;
  category: Category;
  onSave: (category: Category) => void;
}

const EditCategoryModal = ({
  open,
  onClose,
  category,
  onSave,
}: Props) => {
  const [name, setName] = useState(
    category?.name || ""
  );

  if (!open || !category) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6">
        <h2 className="mb-5 text-xl font-semibold">
          Edit Category
        </h2>

        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="mb-4 w-full rounded-xl border p-3"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onSave({
                ...category,
                name,
              })
            }
            className="rounded-xl bg-emerald-600 px-4 py-2 text-white"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryModal;