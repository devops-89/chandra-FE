'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';

import { useServiceManager } from '@/hooks/useServiceManager';
import type { AdminService, EditServiceFormData } from '@/types/admin/service.types';

import type { Specification } from '../addService/AddServiceForm';
import SpecificationsStep from '../addService/SpecificationsStep';

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
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
        {hint && <span className="ml-2 text-xs font-normal text-slate-400">{hint}</span>}
      </label>
      {children}
    </div>
  );
}

/* ─── Numeric input with optional prefix/suffix ─────────────────── */
function NumericField({
  label,
  required,
  prefix,
  suffix,
  placeholder,
  value,
  onChange,
}: {
  label:       string;
  required?:   boolean;
  prefix?:     string;
  suffix?:     string;
  placeholder: string;
  value:       string;
  onChange:    (v: string) => void;
}) {
  return (
    <Field label={label} required={required}>
      <div className="relative">
        {prefix && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-medium text-slate-400">
            {prefix}
          </span>
        )}
        <input
          type="number"
          min="0"
          step="0.01"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputCls} ${prefix ? 'pl-7' : ''} ${suffix ? 'pr-10' : ''}`}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
            {suffix}
          </span>
        )}
      </div>
    </Field>
  );
}

/* ─── Inner form ─────────────────────────────────────────────────── */
function ServiceEditFields({
  service,
  onClose,
  onSave,
}: {
  service: AdminService;
  onClose: () => void;
  onSave:  (data: EditServiceFormData) => void;
}) {
  const [form, setForm] = useState<EditServiceFormData>({
    id:              service.id,
    name:            service.name,
    description:     service.description,
    isActive:        service.isActive,
    serviceBasePrice:String(service.price),
    perHourRate:     service.perHourRate     ? String(service.perHourRate)     : '',
    perKmRate:       service.perKmRate       ? String(service.perKmRate)       : '',
    platformFee:     service.platformFee     ? String(service.platformFee)     : '',
    gst:             service.gst             ? String(service.gst)             : '',
    emergencyCharge: service.emergencyCharge ? String(service.emergencyCharge) : '',
  });

  const [specifications, setSpecifications] = useState<Specification[]>(
  (service.specifications ?? []).map((spec) => ({
    ...spec,
    id: String(spec.id),      // remove this line if Specification.id is number
    values: spec.values ?? [], // always provide an array
  }))
);

  const set = (field: keyof EditServiceFormData, value: string | boolean | number) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...form, specifications });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-5 px-6 py-6 overflow-y-auto">

      {/* ── Service Name ──────────────────────────────────────────── */}
      <Field label="Service Name" required>
        <input
          value={form.name}
          onChange={(e) => set('name', e.target.value)}
          placeholder="e.g. AC Deep Cleaning"
          required
          className={inputCls}
        />
      </Field>

      {/* ── Description ───────────────────────────────────────────── */}
      <Field label="Description">
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          placeholder="Describe the service..."
          className={`${inputCls} resize-none`}
        />
      </Field>

      {/* ── Specifications section ────────────────────────────────── */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Specifications
        </p>
        <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
          <SpecificationsStep
            specifications={specifications}
            onChange={setSpecifications}
            errors={{}}
          />
        </div>
      </div>

      {/* ── Pricing section ───────────────────────────────────────── */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Pricing
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <NumericField
            label="Base Price"
            required
            prefix="₹"
            placeholder="0"
            value={form.serviceBasePrice}
            onChange={(v) => set('serviceBasePrice', v)}
          />
          <NumericField
            label="Per Hour Rate"
            prefix="₹"
            suffix="/hr"
            placeholder="0"
            value={form.perHourRate}
            onChange={(v) => set('perHourRate', v)}
          />
          <NumericField
            label="Per KM Rate"
            prefix="₹"
            suffix="/km"
            placeholder="0"
            value={form.perKmRate}
            onChange={(v) => set('perKmRate', v)}
          />
          <NumericField
            label="Platform Fee"
            prefix="₹"
            placeholder="0"
            value={form.platformFee}
            onChange={(v) => set('platformFee', v)}
          />
          <NumericField
            label="GST"
            suffix="%"
            placeholder="18"
            value={form.gst}
            onChange={(v) => set('gst', v)}
          />
          <NumericField
            label="Emergency Charge"
            prefix="₹"
            placeholder="0"
            value={form.emergencyCharge}
            onChange={(v) => set('emergencyCharge', v)}
          />
        </div>
      </div>

      {/* ── Active toggle ─────────────────────────────────────────── */}
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3.5">
        <div>
          <p className="text-sm font-medium text-slate-700">Active</p>
          <p className="mt-0.5 text-xs text-slate-400">
            Visible to customers when enabled.
          </p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={form.isActive}
          onClick={() => set('isActive', !form.isActive)}
          className={`relative ml-4 h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
            form.isActive ? 'bg-emerald-600' : 'bg-slate-300'
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
              form.isActive ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* ── Footer ────────────────────────────────────────────────── */}
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
  service: AdminService | null;
  onClose: () => void;
  onSave:  (data: EditServiceFormData) => void;
}

/* ─── Outer component — animation shell ────────────────────────── */
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
          className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-lg flex-col bg-white shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-6 py-5 shrink-0">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Edit Service</h2>
              <p className="text-xs text-slate-500">ID: {service.id}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
              aria-label="Close drawer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Keyed inner form — remounts on every new service */}
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

export { useServiceManager };
