'use client';

import { FieldError, type FormData,type FormErrors } from './AddServiceForm';

/* ─── Shared input class ─────────────────────────────────────────── */
const inputBase = `
  w-full rounded-xl border p-3
  text-slate-800 placeholder:text-slate-400
  outline-none transition-all
  focus:ring-2 focus:ring-emerald-100
`;

/* ─── Props ──────────────────────────────────────────────────────── */
interface Props {
  data: {
    serviceBasePrice:        string;
    isServiceBasePriceApplied: boolean;
    platformFee:     string;
    isPlatformFeeApplied: boolean;
    gst:             string;
    isGstApplied:    boolean;
  };
  errors:   FormErrors;
  onChange: (field: keyof FormData, value: FormData[keyof FormData]) => void;
}

/* ─── Reusable numeric field ─────────────────────────────────────── */
function PriceField({
  id,
  label,
  required,
  prefix,
  suffix,
  placeholder,
  value,
  error,
  onChange,
  toggleLabel,
  isToggled,
  onToggle,
}: {
  id:          string;
  label:       string;
  required?:   boolean;
  prefix?:     string;
  suffix?:     string;
  placeholder: string;
  value:       string;
  error?:      string;
  onChange:    (v: string) => void;
  toggleLabel?: string;
  isToggled?:   boolean;
  onToggle?:    (v: boolean) => void;
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <label htmlFor={id} className="block text-sm font-medium text-slate-700">
          {label}{' '}
          {required
            ? <span className="text-red-500">*</span>
            : <span className="text-xs font-normal text-slate-400">(optional)</span>}
        </label>
        {onToggle && (
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={isToggled}
                onChange={(e) => onToggle(e.target.checked)}
              />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
            </div>
            {toggleLabel && <span className="ml-2 text-xs font-medium text-slate-600">{toggleLabel}</span>}
          </label>
        )}
      </div>
      <div className="relative">
        {prefix && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-medium text-slate-400">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="number"
          min="0"
          step="0.01"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputBase} ${prefix ? 'pl-7' : ''} ${suffix ? 'pr-10' : ''} ${
            error
              ? 'border-red-400 focus:border-red-400'
              : 'border-slate-200 focus:border-emerald-500'
          }`}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
            {suffix}
          </span>
        )}
      </div>
      <FieldError message={error} />
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────────────── */
export default function PricingStep({ data, errors, onChange }: Props) {
  return (
    <div className="space-y-6">

      {/* ── Core fares ───────────────────────────────────────────── */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Core Fares
        </h3>
        <div className="grid gap-4 sm:grid-cols-1">
          <PriceField
            id="serviceBasePrice"
            label="Service Base Price"
            required
            prefix="₹"
            placeholder="0"
            value={data.serviceBasePrice}
            error={errors.serviceBasePrice}
            onChange={(v) => onChange('serviceBasePrice', v)}
            toggleLabel="Apply?"
            isToggled={data.isServiceBasePriceApplied}
            onToggle={(v) => onChange('isServiceBasePriceApplied', v as any)}
          />
        </div>
      </div>

      {/* ── Platform charges ─────────────────────────────────────── */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Platform Charges
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <PriceField
            id="platformFee"
            label="Platform Fee"
            prefix="₹"
            placeholder="0"
            value={data.platformFee}
            error={errors.platformFee}
            onChange={(v) => onChange('platformFee', v)}
            toggleLabel="Apply?"
            isToggled={data.isPlatformFeeApplied}
            onToggle={(v) => onChange('isPlatformFeeApplied', v as any)}
          />
          <PriceField
            id="gst"
            label="GST"
            suffix="%"
            placeholder="18"
            value={data.gst}
            error={errors.gst}
            onChange={(v) => onChange('gst', v)}
            toggleLabel="Apply?"
            isToggled={data.isGstApplied}
            onToggle={(v) => onChange('isGstApplied', v as any)}
          />
        </div>
      </div>

      {/* ── Live preview ─────────────────────────────────────────── */}
      {data.serviceBasePrice && (
        <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-800 space-y-1">
          <p className="font-semibold text-emerald-900">Pricing Summary</p>
          <div className="grid gap-x-6 gap-y-1 sm:grid-cols-2 mt-2 text-emerald-700">
            <span className={data.isServiceBasePriceApplied ? '' : 'line-through opacity-50'}>Service Base Price: <strong>₹{data.serviceBasePrice}</strong></span>
            {data.platformFee && <span className={data.isPlatformFeeApplied ? '' : 'line-through opacity-50'}>Platform Fee: <strong>₹{data.platformFee}</strong></span>}
            {data.gst         && <span className={data.isGstApplied ? '' : 'line-through opacity-50'}>GST: <strong>{data.gst}%</strong></span>}
          </div>
        </div>
      )}
    </div>
  );
}
