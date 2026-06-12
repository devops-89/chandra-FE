'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';

/* ─── Types ───────────────────────────────────────────────────────── */
export type AddCategoryModalMode = 'category' | 'subcategory';

interface Props {
  /** 'category' to add a top-level category, 'subcategory' to add under a parent */
  mode: AddCategoryModalMode;
  /** Parent category name — shown as context when mode === 'subcategory' */
  parentCategoryName?: string;
  onClose: () => void;
  /** Called with the trimmed name when the user confirms */
  onConfirm: (name: string) => void;
}

/* ─── Component ────────────────────────────────────────────────────── */
export default function AddCategoryModal({
  mode,
  parentCategoryName,
  onClose,
  onConfirm,
}: Props) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const title =
    mode === 'category' ? 'Add New Category' : 'Add New Subcategory';

  const placeholder =
    mode === 'category'
      ? 'e.g. Home Renovation'
      : 'e.g. Tile Laying';

  const handleConfirm = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Name is required.');
      return;
    }
    if (trimmed.length < 2) {
      setError('Must be at least 2 characters.');
      return;
    }
    onConfirm(trimmed);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleConfirm();
    if (e.key === 'Escape') onClose();
  };

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="fixed inset-0 z-50 bg-black/40"
        onClick={onClose}
      />

      {/* Dialog */}
      <motion.div
        key="dialog"
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        // Don't close when clicking inside the dialog
      >
        <div
          className="w-full max-w-sm rounded-2xl bg-white shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <h2 className="font-semibold text-slate-900">{title}</h2>
            <button
              onClick={onClose}
              className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-5 space-y-4">
            {/* Context label for subcategory */}
            {mode === 'subcategory' && parentCategoryName && (
              <p className="text-xs text-slate-500">
                Adding under:{' '}
                <span className="font-semibold text-slate-700">
                  {parentCategoryName}
                </span>
              </p>
            )}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                {mode === 'category' ? 'Category Name' : 'Subcategory Name'}{' '}
                <span className="text-red-500">*</span>
              </label>
              <input
                autoFocus
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                }}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className={`
                  w-full rounded-xl border p-3 text-sm text-slate-800
                  placeholder:text-slate-400 outline-none transition-all
                  focus:ring-2 focus:ring-emerald-100
                  ${error
                    ? 'border-red-400 focus:border-red-400'
                    : 'border-slate-200 focus:border-emerald-500'
                  }
                `}
              />
              {error && (
                <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 border-t border-slate-100 px-6 py-4">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 rounded-xl bg-emerald-600 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
            >
              Add {mode === 'category' ? 'Category' : 'Subcategory'}
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
