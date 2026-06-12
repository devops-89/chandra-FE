"use client";

import { useState } from "react";

interface Category {
  id: number;
  name: string;
  description: string;
  subcategories: string[];
}

interface Props {
  open: boolean;
  onClose: () => void;
  onAddCategory: (category: Category) => void;
}

const AddCategoryModal = ({
  open,
  onClose,
  onAddCategory,
}: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");

  if (!open) return null;

  const handleAdd = () => {
    if (!name.trim()) return;

    onAddCategory({
      id: Date.now(),
      name,
      description,
      subcategories: [],
    });

    setName("");
    setDescription("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6">
        <h2 className="mb-5 text-xl font-semibold">
          Add Category
        </h2>

        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Category Name"
          className="mb-4 w-full rounded-xl border p-3"
        />

        <textarea
          rows={3}
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
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

          <button
            onClick={handleAdd}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-white"
          >
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;