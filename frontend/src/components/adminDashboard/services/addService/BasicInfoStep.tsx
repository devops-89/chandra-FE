'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';

import { useCategoryManager } from '@/hooks/useCategoryManager';

import AddCategoryModal from './AddCategoryModal';
import { FieldError, type FormErrors } from './AddServiceForm';

/* ─── Shared input class ─────────────────────────────────────────── */
const inputBase = `
  w-full rounded-xl border p-3
  text-slate-800 placeholder:text-slate-400
  outline-none transition-all
  focus:ring-2 focus:ring-emerald-100
`;

/* ─── Props ──────────────────────────────────────────────────────── */
interface Props {
  data: { name: string; category: string; subcategory: string };
  errors: FormErrors;
  onChange: (field: string, value: string) => void;
}

/* ─── Modal modes ────────────────────────────────────────────────── */
type ModalState =
  | { open: false }
  | { open: true; mode: 'category' }
  | { open: true; mode: 'subcategory' };

/* ─── Component ─────────────────────────────────────────────────── */
export default function BasicInfoStep({ data, errors, onChange }: Props) {
  const {
    categories,
    categoryNames,
    getSubcategories,
    addCategory,
    addSubcategory,
  } = useCategoryManager();

  const [modal, setModal] = useState<ModalState>({ open: false });

  const subcategories = getSubcategories(data.category);

  /* Find category id by name (needed to add a subcategory under it) */
  const selectedCategoryId =
    categories.find((c) => c.name === data.category)?.id ?? '';

  const handleAddCategory = (name: string) => {
    addCategory({ name });
    // Auto-select the newly created category
    onChange('category', name);
    onChange('subcategory', '');
  };

  const handleAddSubcategory = (name: string) => {
    if (!selectedCategoryId) return;
    addSubcategory({ name, categoryId: selectedCategoryId });
    // Auto-select the newly created subcategory
    onChange('subcategory', name);
  };

  return (
    <div className="space-y-5">
      {/* ── Service Name ─────────────────────────────────────────── */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Service Name <span className="text-red-500">*</span>
        </label>
        <input
          value={data.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="e.g. Solar Panel Deep Clean"
          className={`${inputBase} ${
            errors.name
              ? 'border-red-400 focus:border-red-400'
              : 'border-slate-200 focus:border-emerald-500'
          }`}
        />
        <FieldError message={errors.name} />
      </div>

      {/* ── Category ─────────────────────────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700">
              Category <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              onClick={() => setModal({ open: true, mode: 'category' })}
              className="flex items-center gap-1 text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              <Plus size={13} strokeWidth={2.5} />
              New
            </button>
          </div>
          <select
            value={data.category}
            onChange={(e) => {
              onChange('category', e.target.value);
              onChange('subcategory', '');
            }}
            className={`${inputBase} bg-white ${
              errors.category
                ? 'border-red-400 focus:border-red-400'
                : 'border-slate-200 focus:border-emerald-500'
            }`}
          >
            <option value="">Select Category</option>
            {categoryNames.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <FieldError message={errors.category} />
        </div>

        {/* ── Subcategory ─────────────────────────────────────────── */}
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700">
              Subcategory
            </label>
            <button
              type="button"
              disabled={!data.category}
              onClick={() => setModal({ open: true, mode: 'subcategory' })}
              className="flex items-center gap-1 text-xs font-medium text-emerald-600 hover:text-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Plus size={13} strokeWidth={2.5} />
              New
            </button>
          </div>
          <select
            value={data.subcategory}
            onChange={(e) => onChange('subcategory', e.target.value)}
            disabled={!data.category}
            className={`${inputBase} bg-white border-slate-200 focus:border-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <option value="">Select Subcategory</option>
            {subcategories.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Add Category / Subcategory modal ─────────────────────── */}
      {modal.open && modal.mode === 'category' && (
        <AddCategoryModal
          mode="category"
          onClose={() => setModal({ open: false })}
          onConfirm={handleAddCategory}
        />
      )}

      {modal.open && modal.mode === 'subcategory' && (
        <AddCategoryModal
          mode="subcategory"
          parentCategoryName={data.category}
          onClose={() => setModal({ open: false })}
          onConfirm={handleAddSubcategory}
        />
      )}
    </div>
  );
}
