'use client';

import { ImagePlus } from 'lucide-react';

import { FieldError, type FormErrors } from './AddServiceForm';

interface Props {
  data: { description: string; image: File | null };
  errors: FormErrors;
  onChange: (field: string, value: string | File | null) => void;
}

export default function DescriptionStep({ data, errors, onChange }: Props) {
  return (
    <div className="space-y-5">
      {/* Description */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Short Description <span className="text-red-500">*</span>
        </label>
        <textarea
          rows={4}
          value={data.description}
          onChange={(e) => onChange('description', e.target.value)}
          placeholder="Describe what the service includes, what customers can expect, and any preparation needed..."
          className={`
            w-full rounded-xl border p-3
            text-slate-800 placeholder:text-slate-400
            outline-none transition-all resize-none
            focus:ring-2 focus:ring-emerald-100
            ${errors.description
              ? 'border-red-400 focus:border-red-400'
              : 'border-slate-200 focus:border-emerald-500'
            }
          `}
        />
        <div className="mt-1 flex items-center justify-between">
          <FieldError message={errors.description} />
          <span className={`ml-auto text-xs ${
            data.description.length < 20 && data.description.length > 0
              ? 'text-red-500'
              : 'text-slate-400'
          }`}>
            {data.description.length} / 500
          </span>
        </div>
      </div>

      {/* Image upload */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Service Image
        </label>
        <label className="
          flex h-40 cursor-pointer flex-col items-center justify-center gap-3
          rounded-xl border-2 border-dashed border-slate-300 bg-slate-50
          text-slate-500 transition-all
          hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-600
        ">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onChange('image', e.target.files?.[0] ?? null)}
          />
          <ImagePlus size={28} />
          {data.image ? (
            <span className="text-sm font-medium text-emerald-600">{data.image.name}</span>
          ) : (
            <span className="text-sm">Click to upload image</span>
          )}
        </label>
      </div>
    </div>
  );
}
