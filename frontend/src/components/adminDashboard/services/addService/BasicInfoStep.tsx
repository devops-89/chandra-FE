'use client';

import { FieldError, type FormErrors } from './AddServiceForm';

const CATEGORIES = [
  'Solar Cleaning',
  'AC Servicing',
  'Electrical',
  'Plumbing',
  'Home Cleaning',
];

const SUBCATEGORIES: Record<string, string[]> = {
  'Solar Cleaning': ['Panel Cleaning', 'Inverter Check'],
  'AC Servicing':   ['Deep Clean', 'Gas Refill', 'Installation'],
  Electrical:       ['Wiring', 'Switchboard', 'Fan Installation'],
  Plumbing:         ['Pipe Repair', 'Drain Cleaning', 'Tap Fitting'],
  'Home Cleaning':  ['Full Home', 'Kitchen', 'Bathroom'],
};

interface Props {
  data: { name: string; category: string; subcategory: string };
  errors: FormErrors;
  onChange: (field: string, value: string) => void;
}

const inputBase = `
  w-full rounded-xl border p-3
  text-slate-800 placeholder:text-slate-400
  outline-none transition-all
  focus:ring-2 focus:ring-emerald-100
`;

export default function BasicInfoStep({ data, errors, onChange }: Props) {
  const subcategories = SUBCATEGORIES[data.category] ?? [];

  return (
    <div className="space-y-5">
      {/* Service Name */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Service Name <span className="text-red-500">*</span>
        </label>
        <input
          value={data.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="e.g. Solar Panel Deep Clean"
          className={`${inputBase} ${
            errors.name ? 'border-red-400 focus:border-red-400' : 'border-slate-200 focus:border-emerald-500'
          }`}
        />
        <FieldError message={errors.name} />
      </div>

      {/* Category + Subcategory */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            value={data.category}
            onChange={(e) => { onChange('category', e.target.value); onChange('subcategory', ''); }}
            className={`${inputBase} bg-white ${
              errors.category ? 'border-red-400 focus:border-red-400' : 'border-slate-200 focus:border-emerald-500'
            }`}
          >
            <option value="">Select Category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <FieldError message={errors.category} />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Subcategory
          </label>
          <select
            value={data.subcategory}
            onChange={(e) => onChange('subcategory', e.target.value)}
            disabled={!data.category}
            className={`${inputBase} bg-white border-slate-200 focus:border-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <option value="">Select Subcategory</option>
            {subcategories.map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
