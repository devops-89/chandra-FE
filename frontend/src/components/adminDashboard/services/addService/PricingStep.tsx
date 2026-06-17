'use client';

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
  data: {
    baseFare:        string;
    perHourRate:     string;
    perKmRate:       string;
    platformFee:     string;
    gst:             string;
    emergencyCharge: string;
  };
  errors:   FormErrors;
  onChange: (field: string, value: string) => void;
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
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}{' '}
        {required
          ? <span className="text-red-500">*</span>
          : <span className="text-xs font-normal text-slate-400">(optional)</span>}
      </label>
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
        <div className="grid gap-4 sm:grid-cols-3">
          <PriceField
            id="baseFare"
            label="Base Fare"
            required
            prefix="₹"
            placeholder="0"
            value={data.baseFare}
            error={errors.baseFare}
            onChange={(v) => onChange('baseFare', v)}
          />
          <PriceField
            id="perHourRate"
            label="Per Hour Rate"
            prefix="₹"
            suffix="/hr"
            placeholder="0"
            value={data.perHourRate}
            error={errors.perHourRate}
            onChange={(v) => onChange('perHourRate', v)}
          />
          <PriceField
            id="perKmRate"
            label="Per KM Rate"
            prefix="₹"
            suffix="/km"
            placeholder="0"
            value={data.perKmRate}
            error={errors.perKmRate}
            onChange={(v) => onChange('perKmRate', v)}
          />
        </div>
      </div>

      {/* ── Platform charges ─────────────────────────────────────── */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Platform Charges
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <PriceField
            id="platformFee"
            label="Platform Fee"
            prefix="₹"
            placeholder="0"
            value={data.platformFee}
            error={errors.platformFee}
            onChange={(v) => onChange('platformFee', v)}
          />
          <PriceField
            id="gst"
            label="GST"
            suffix="%"
            placeholder="18"
            value={data.gst}
            error={errors.gst}
            onChange={(v) => onChange('gst', v)}
          />
          <PriceField
            id="emergencyCharge"
            label="Emergency Charge"
            prefix="₹"
            placeholder="0"
            value={data.emergencyCharge}
            error={errors.emergencyCharge}
            onChange={(v) => onChange('emergencyCharge', v)}
          />
        </div>
      </div>

      {/* ── Live preview ─────────────────────────────────────────── */}
      {data.baseFare && (
        <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-800 space-y-1">
          <p className="font-semibold text-emerald-900">Pricing Summary</p>
          <div className="grid gap-x-6 gap-y-1 sm:grid-cols-2 mt-2 text-emerald-700">
            <span>Base Fare: <strong>₹{data.baseFare}</strong></span>
            {data.perHourRate && <span>Per Hour: <strong>₹{data.perHourRate}/hr</strong></span>}
            {data.perKmRate   && <span>Per KM: <strong>₹{data.perKmRate}/km</strong></span>}
            {data.platformFee && <span>Platform Fee: <strong>₹{data.platformFee}</strong></span>}
            {data.gst         && <span>GST: <strong>{data.gst}%</strong></span>}
            {data.emergencyCharge && <span>Emergency: <strong>₹{data.emergencyCharge}</strong></span>}
          </div>
        </div>
      )}
    </div>
  );
}
