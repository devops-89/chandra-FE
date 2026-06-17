'use client';

import { FieldError, type FormErrors } from './AddServiceForm';

/* ─── Props ──────────────────────────────────────────────────────── */
interface Props {
  data: {
    status: string;
    cities: string;
  };
  errors:   FormErrors;
  onChange: (field: string, value: string) => void;
}

/* ─── Shared input styles ────────────────────────────────────────── */
const inputBase = `
  w-full rounded-xl border p-3
  text-slate-800 placeholder:text-slate-400
  outline-none transition-all
  focus:ring-2 focus:ring-emerald-100
`;

/* ─── Component ──────────────────────────────────────────────────── */
export default function PublishStep({ data, errors, onChange }: Props) {
  return (
    <div className="space-y-5">

      <div className="grid gap-4 sm:grid-cols-2">

        {/* ── Status ───────────────────────────────────────────────── */}
        <div>
          <label
            htmlFor="pub-status"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Initial Status <span className="text-red-500">*</span>
          </label>
          <select
            id="pub-status"
            title="Publish status"
            value={data.status}
            onChange={(e) => onChange('status', e.target.value)}
            className={`${inputBase} bg-white ${
              errors.status
                ? 'border-red-400 focus:border-red-400'
                : 'border-slate-200 focus:border-emerald-500'
            }`}
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
          </select>
          <FieldError message={errors.status} />
        </div>

        {/* ── Available Cities ─────────────────────────────────────── */}
        <div>
          <label
            htmlFor="pub-cities"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Available Cities
            <span className="ml-2 text-xs font-normal text-slate-400">(optional)</span>
          </label>
          <input
            id="pub-cities"
            value={data.cities}
            onChange={(e) => onChange('cities', e.target.value)}
            placeholder="e.g. Delhi, Noida, Gurgaon"
            className={`${inputBase} border-slate-200 focus:border-emerald-500`}
          />
          <p className="mt-1 text-xs text-slate-400">Separate multiple cities with commas</p>
        </div>
      </div>

      {/* ── Live preview — only shown once status is selected ──────── */}
      {data.status && (
        <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
          <p className="text-sm font-medium text-emerald-800">
            This service will be published as{' '}
            <span className="font-bold">
              {data.status === 'Active' ? 'Active' : 'Draft (Inactive)'}
            </span>
            {data.cities && (
              <>
                {' '}and available in{' '}
                <span className="font-bold">{data.cities}</span>
              </>
            )}
            .
          </p>
        </div>
      )}

    </div>
  );
}
