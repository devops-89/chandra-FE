"use client";

import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  categories: string[];
  onAddSubcategory: (
    category: string,
    subcategory: string
  ) => void;
}

const AddSubcategoryModal = ({
  open,
  onClose,
  categories,
  onAddSubcategory,
}: Props) => {
  const [category, setCategory] =
    useState("");

  const [subcategory, setSubcategory] =
    useState("");

  if (!open) return null;

  const handleAdd = () => {
    if (!category || !subcategory)
      return;

    onAddSubcategory(
      category,
      subcategory
    );

    setCategory("");
    setSubcategory("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6">
        <h2 className="mb-5 text-xl font-semibold">
          Add Subcategory
        </h2>

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="mb-4 w-full rounded-xl border p-3"
        >
          <option value="">
            Select Category
          </option>

          {categories.map((cat) => (
            <option
              key={cat}
              value={cat}
            >
              {cat}
            </option>
          ))}
        </select>

        <input
          value={subcategory}
          onChange={(e) =>
            setSubcategory(
              e.target.value
            )
          }
          placeholder="Subcategory Name"
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
            Add Subcategory
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSubcategoryModal;