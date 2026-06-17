'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { GripVertical, Plus, Trash2 } from 'lucide-react';

import type { FormErrors, SpecFieldType, Specification } from './AddServiceForm';
import { FieldError } from './AddServiceForm';

/* ─── Props ──────────────────────────────────────────────────────── */
interface Props {
  specifications: Specification[];
  errors:         FormErrors;
  onChange:       (specs: Specification[]) => void;
}

/* ─── Field type options ─────────────────────────────────────────── */
const FIELD_TYPES: { value: SpecFieldType; label: string }[] = [
  { value: 'text',     label: 'Text' },
  { value: 'number',   label: 'Number' },
  { value: 'select',   label: 'Select (dropdown)' },
  { value: 'textarea', label: 'Textarea' },
  { value: 'file',     label: 'File Upload' },
];

/* ─── Shared input styles ────────────────────────────────────────── */
const inputCls = `
  w-full rounded-lg border border-slate-200 px-3 py-2
  text-sm text-slate-800 placeholder:text-slate-400
  outline-none transition-all
  focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100
`;

/* ─── uid helper ─────────────────────────────────────────────────── */
const uid = () => Math.random().toString(36).slice(2, 9);

/* ─── Empty spec ─────────────────────────────────────────────────── */
const emptySpec = (): Specification => ({
  id:       uid(),
  label:    '',
  type:     'text',
  required: false,
  options:  [],
});

/* ─── Component ──────────────────────────────────────────────────── */
export default function SpecificationsStep({ specifications, errors, onChange }: Props) {

  /* helpers that produce a new array */
  const addSpec = () => onChange([...specifications, emptySpec()]);

  const removeSpec = (id: string) =>
    onChange(specifications.filter((s) => s.id !== id));

  const updateSpec = (id: string, patch: Partial<Specification>) =>
    onChange(
      specifications.map((s) => (s.id === id ? { ...s, ...patch } : s))
    );

  /* options helpers (only for type=select) */
  const addOption = (specId: string) => {
    const spec = specifications.find((s) => s.id === specId);
    if (!spec) return;
    updateSpec(specId, { options: [...spec.options, ''] });
  };

  const updateOption = (specId: string, idx: number, value: string) => {
    const spec = specifications.find((s) => s.id === specId);
    if (!spec) return;
    const opts = [...spec.options];
    opts[idx] = value;
    updateSpec(specId, { options: opts });
  };

  const removeOption = (specId: string, idx: number) => {
    const spec = specifications.find((s) => s.id === specId);
    if (!spec) return;
    updateSpec(specId, { options: spec.options.filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-4">

      {/* Empty state */}
      {specifications.length === 0 && (
        <div className="rounded-xl border-2 border-dashed border-slate-200 py-10 text-center">
          <p className="text-sm font-medium text-slate-500">No specifications yet.</p>
          <p className="mt-1 text-xs text-slate-400">
            Add questions customers must answer when booking this service.
          </p>
        </div>
      )}

      {/* Spec cards */}
      <AnimatePresence initial={false}>
        {specifications.map((spec, i) => (
          <motion.div
            key={spec.id}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.18 }}
            className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-4"
          >
            {/* Card header */}
            <div className="flex items-center gap-2">
              <GripVertical size={16} className="shrink-0 text-slate-300" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Field {i + 1}
              </span>
              <button
                type="button"
                onClick={() => removeSpec(spec.id)}
                className="ml-auto rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                aria-label="Remove field"
              >
                <Trash2 size={15} />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Label */}
              <div>
                <label
                  htmlFor={`spec-label-${spec.id}`}
                  className="mb-1.5 block text-xs font-medium text-slate-600"
                >
                  Question Label <span className="text-red-500">*</span>
                </label>
                <input
                  id={`spec-label-${spec.id}`}
                  value={spec.label}
                  placeholder="e.g. Number of Solar Panels"
                  onChange={(e) => updateSpec(spec.id, { label: e.target.value })}
                  className={`${inputCls} ${
                    errors[`spec_label_${i}`] ? 'border-red-400 focus:border-red-400' : ''
                  }`}
                />
                <FieldError message={errors[`spec_label_${i}`]} />
              </div>

              {/* Field type */}
              <div>
                <label
                  htmlFor={`spec-type-${spec.id}`}
                  className="mb-1.5 block text-xs font-medium text-slate-600"
                >
                  Field Type
                </label>
                <select
                  id={`spec-type-${spec.id}`}
                  value={spec.type}
                  title="Field type"
                  onChange={(e) =>
                    updateSpec(spec.id, {
                      type:    e.target.value as SpecFieldType,
                      options: [],
                    })
                  }
                  className={`${inputCls} bg-white`}
                >
                  {FIELD_TYPES.map((ft) => (
                    <option key={ft.value} value={ft.value}>
                      {ft.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Required toggle */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                role="switch"
                aria-checked={spec.required}
                onClick={() => updateSpec(spec.id, { required: !spec.required })}
                className={`relative h-5 w-9 shrink-0 rounded-full transition-colors duration-200 ${
                  spec.required ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                    spec.required ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className="text-xs font-medium text-slate-600">
                Required field
              </span>
            </div>

            {/* Options builder — only for select */}
            {spec.type === 'select' && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-slate-600">
                  Options <span className="text-red-500">*</span>
                  <span className="ml-1 text-slate-400 font-normal">(min 2)</span>
                </p>

                <AnimatePresence initial={false}>
                  {spec.options.map((opt, oi) => (
                    <motion.div
                      key={oi}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.14 }}
                      className="flex items-center gap-2"
                    >
                      <input
                        value={opt}
                        placeholder={`Option ${oi + 1}`}
                        onChange={(e) => updateOption(spec.id, oi, e.target.value)}
                        className={`${inputCls} flex-1`}
                        aria-label={`Option ${oi + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeOption(spec.id, oi)}
                        className="shrink-0 rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                        aria-label="Remove option"
                      >
                        <Trash2 size={14} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <FieldError message={errors[`spec_options_${i}`]} />

                <button
                  type="button"
                  onClick={() => addOption(spec.id)}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-50 border border-emerald-200 transition-colors"
                >
                  <Plus size={13} strokeWidth={2.5} />
                  Add Option
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Add field button */}
      <button
        type="button"
        onClick={addSpec}
        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 py-3 text-sm font-medium text-slate-500 hover:border-emerald-400 hover:text-emerald-700 hover:bg-emerald-50/40 transition-colors"
      >
        <Plus size={16} strokeWidth={2.5} />
        Add Specification Field
      </button>

      {/* Backend shape hint */}
      {specifications.length > 0 && (
        <p className="text-xs text-slate-400">
          These will be submitted as a <code className="font-mono">specifications[]</code> array in the service creation request.
        </p>
      )}
    </div>
  );
}
