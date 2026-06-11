'use client';

import { FieldError, type FormErrors } from './AddServiceForm';

interface Props {
  data: { pricingType: string; basePrice: string; duration: string };
  errors: FormErrors;
  onChange: (field: string, value: string) => void;
}

const PRICING_TYPES = ['Fixed Price', 'Starting Price', 'Inspection Based'];

const inputBase = `
  w-full rounded-xl border p-3
  text-slate-800 placeholder:text-slate-400
  outline-none transition-all
  focus:ring-2 focus:ring-emerald-100
`;

export default function PricingStep({ data, errors, onChange }: Props) {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Pricing type */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Pricing Type <span className="text-red-500">*</span>
          </label>
          <select
            value={data.pricingType}
            onChange={(e) => onChange('pricingType', e.target.value)}
            className={`${inputBase} bg-white ${
              errors.pricingType
                ? 'border-red-400 focus:border-red-400'
                : 'border-slate-200 focus:border-emerald-500'
            }`}
          >
            <option value="">Select Pricing Type</option>
            {PRICING_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <FieldError message={errors.pricingType} />
        </div>

        {/* Base price */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Base Price (₹) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-medium text-slate-400">
              ₹
            </span>
            <input
              type="number"
              min="0"
              value={data.basePrice}
              onChange={(e) => onChange('basePrice', e.target.value)}
              placeholder="0"
              className={`${inputBase} pl-7 ${
                errors.basePrice
                  ? 'border-red-400 focus:border-red-400'
                  : 'border-slate-200 focus:border-emerald-500'
              }`}
            />
          </div>
          <FieldError message={errors.basePrice} />
        </div>
      </div>

      {/* Duration */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Service Duration <span className="text-red-500">*</span>
        </label>
        <input
          value={data.duration}
          onChange={(e) => onChange('duration', e.target.value)}
          placeholder="e.g. 60 mins, 2–3 hours"
          className={`${inputBase} ${
            errors.duration
              ? 'border-red-400 focus:border-red-400'
              : 'border-slate-200 focus:border-emerald-500'
          }`}
        />
        <FieldError message={errors.duration} />
      </div>
    </div>
  );
}
