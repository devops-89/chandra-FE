'use client';

import { ImageIcon } from 'lucide-react';
import { useRef } from 'react';

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
    name:        string;
    description: string;
    icon:        File | null;
    isActive:    boolean;
  };
  errors:   FormErrors;
  onChange: (field: keyof FormData, value: FormData[keyof FormData]) => void;
  existingIconUrl?: string | null;
}

/* ─── Component ──────────────────────────────────────────────────── */
export default function BasicInfoStep({ data, errors, onChange, existingIconUrl }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onChange('icon', file);
  };

  return (
    <div className="space-y-5">

      {/* ── Service Name ─────────────────────────────────────────── */}
      <div>
        <label
          htmlFor="svc-name"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Service Name <span className="text-red-500">*</span>
        </label>
        <input
          id="svc-name"
          value={data.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="e.g. Solar Panel Deep Clean"
          className={`${inputBase} ${
            errors.name
              ? 'border-red-400 focus:border-red-400'
              : 'border-slate-200 focus:border-emerald-500'
          }`}
        />
        <FieldError message={errors.name} />
      </div>

      {/* ── Description ──────────────────────────────────────────── */}
      <div>
        <label
          htmlFor="svc-description"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="svc-description"
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
            data.description.length > 0 && data.description.length < 20
              ? 'text-red-500'
              : 'text-slate-400'
          }`}>
            {data.description.length} / 500
          </span>
        </div>
      </div>

      {/* ── Icon Upload ───────────────────────────────────────────── */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Service Icon
          <span className="ml-2 text-xs font-normal text-slate-400">(optional)</span>
        </label>

        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex cursor-pointer items-center gap-4 rounded-xl border-2 border-dashed border-slate-200 px-4 py-5 transition-colors hover:border-emerald-400 hover:bg-emerald-50/40"
        >
          {/* Preview or placeholder */}
          {data.icon ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={URL.createObjectURL(data.icon)}
              alt="Service icon preview"
              className="h-12 w-12 rounded-xl object-cover ring-2 ring-emerald-100"
            />
          ) : existingIconUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={existingIconUrl}
              alt="Current service icon"
              className="h-12 w-12 rounded-xl object-cover ring-2 ring-emerald-100"
            />
          ) : (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
              <ImageIcon size={22} />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-700">
              {data.icon ? data.icon.name : existingIconUrl ? 'Upload a new icon to replace' : 'Click to upload icon'}
            </p>
            <p className="mt-0.5 text-xs text-slate-400">
              PNG, JPG or SVG · max 2 MB
            </p>
          </div>

          {data.icon && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange('icon', null);
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
              className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 transition-colors"
            >
              Remove
            </button>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          aria-label="Upload service icon"
        />
      </div>

      {/* ── Active Toggle ─────────────────────────────────────────── */}
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3.5">
        <div>
          <p className="text-sm font-medium text-slate-700">Active</p>
          <p className="mt-0.5 text-xs text-slate-400">
            When enabled this service will be visible to customers immediately after publishing.
          </p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={data.isActive}
          onClick={() => onChange('isActive', !data.isActive)}
          className={`
            relative ml-4 h-6 w-11 shrink-0 rounded-full transition-colors duration-200
            ${data.isActive ? 'bg-emerald-600' : 'bg-slate-300'}
          `}
        >
          <span
            className={`
              absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200
              ${data.isActive ? 'translate-x-5' : 'translate-x-0'}
            `}
          />
        </button>
      </div>

    </div>
  );
}
