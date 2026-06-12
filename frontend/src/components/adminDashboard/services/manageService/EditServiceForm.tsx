'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';

import { useServiceManager } from '@/hooks/useServiceManager';
import type { AdminService, EditServiceFormData } from '@/types/admin/service.types';

/* ─── Data ───────────────────────────────────────────────────────── */
const CATEGORIES = [
  'Appliance Repair',
  'Plumbing',
  'Electrical',
  'Solar Cleaning',
  'Home Cleaning',
  'AC Servicing',
];

const SUBCATEGORIES: Record<string, string[]> = {
  'Appliance Repair': ['Air Conditioner', 'Washing Machine', 'Refrigerator'],
  Plumbing:           ['Leakage', 'Pipe Fitting', 'Drain Cleaning'],
  Electrical:         ['Wiring', 'Switchboard', 'Fan Installation'],
  'Solar Cleaning':   ['Panel Cleaning', 'Inverter Check'],
  'Home Cleaning':    ['Full Home', 'Kitchen', 'Bathroom'],
  'AC Servicing':     ['Deep Clean', 'Gas Refill', 'Installation'],
};

/* ─── Shared input class ─────────────────────────────────────────── */
const inputCls = `
  w-full rounded-xl border border-slate-200 p-3
  text-slate-800 placeholder:text-slate-400
  outline-none focus:border-emerald-500
  focus:ring-2 focus:ring-emerald-100
  transition-all bg-white
`;

/* ─── Field wrapper ─────────────────────────────────────────────── */
function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

/* ─── Inner form ─────────────────────────────────────────────────── */
/**
 * Keyed on service.id so React re-mounts this component (and resets
 * its state) whenever a different service is opened — no useEffect needed.
 */
function ServiceEditFields({
  service,
  onClose,
  onSave,
}: {
  service: AdminService;
  onClose: () => void;
  onSave: (data: EditServiceFormData) => void;
}) {
  const [form, setForm] = useState<EditServiceFormData>({
    name:        service.name,
    category:    service.category,
    subcategory: service.subcategory,
    price:       String(service.price),
    duration:    service.duration,
    status:      service.status,
  });

  const set = (field: keyof EditServiceFormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  const subcategories = SUBCATEGORIES[form.category] ?? [];

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-5 px-6 py-6">
      <Field label="Service Name" required>
        <input
          value={form.name}
          onChange={(e) => set('name', e.target.value)}
          placeholder="e.g. AC Deep Cleaning"
          required
          className={inputCls}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Category" required>
          <select
            value={form.category}
            onChange={(e) => {
              set('category', e.target.value);
              set('subcategory', '');
            }}
            required
            className={inputCls}
          >
            <option value="">Select Category</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>

        <Field label="Subcategory">
          <select
            value={form.subcategory}
            onChange={(e) => set('subcategory', e.target.value)}
            disabled={!form.category}
            className={`${inputCls} disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <option value="">Select Subcategory</option>
            {subcategories.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Base Price (₹)" required>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-medium text-slate-400">
              ₹
            </span>
            <input
              type="number"
              min="0"
              value={form.price}
              onChange={(e) => set('price', e.target.value)}
              placeholder="0"
              required
              className={`${inputCls} pl-7`}
            />
          </div>
        </Field>

        <Field label="Duration" required>
          <input
            value={form.duration}
            onChange={(e) => set('duration', e.target.value)}
            placeholder="e.g. 60 mins"
            required
            className={inputCls}
          />
        </Field>
      </div>

      <Field label="Status" required>
        <div className="flex gap-3">
          {(['Active', 'Inactive'] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => set('status', s)}
              className={`
                flex-1 rounded-xl border py-2.5 text-sm font-medium transition-all
                ${form.status === s
                  ? s === 'Active'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-red-300 bg-red-50 text-red-600'
                  : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                }
              `}
            >
              {s}
            </button>
          ))}
        </div>
      </Field>

      {/* Pushes footer to bottom when drawer is taller than content */}
      <div className="flex-1" />

      <div className="flex gap-3 border-t border-slate-100 pt-5">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 rounded-xl bg-emerald-600 py-3 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}

/* ─── Props ──────────────────────────────────────────────────────── */
interface Props {
  /** The service being edited — null means the drawer is closed */
  service: AdminService | null;
  onClose: () => void;
  onSave: (data: EditServiceFormData) => void;
}

/* ─── Outer component — animation shell only ────────────────────── */
const EditServiceForm = ({ service, onClose, onSave }: Props) => (
  <AnimatePresence>
    {service !== null && (
      <>
        {/* Backdrop */}
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-40 bg-black/40"
          onClick={onClose}
        />

        {/* Slide-in drawer */}
        <motion.aside
          key="drawer"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.28, ease: 'easeInOut' }}
          className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-lg flex-col bg-white shadow-2xl overflow-y-auto"
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-6 py-5">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Edit Service</h2>
              <p className="text-xs text-slate-500">ID: {service.id}</p>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
              aria-label="Close drawer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Keyed inner form — remounts on every new service, resetting state */}
          <ServiceEditFields
            key={service.id}
            service={service}
            onClose={onClose}
            onSave={onSave}
          />
        </motion.aside>
      </>
    )}
  </AnimatePresence>
);

export default EditServiceForm;

/**
 * Re-export the hook so consumers can import both from one place:
 *   import EditServiceForm, { useServiceManager } from '.../EditServiceForm'
 */
export { useServiceManager };
