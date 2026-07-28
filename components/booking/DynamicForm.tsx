'use client';

import { ChevronDown } from 'lucide-react';
import { useEffect, useMemo } from 'react';

// Sub-component for handling file object preview with cleanup to prevent memory leaks
function ImagePreview({ file }: { file: File }) {
  const preview = useMemo(() => {
    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(preview);
    };
  }, [preview]);

  if (!preview) return null;

  return (
    <div className="relative mt-3 h-36 w-36 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={preview} alt="Upload preview" className="h-full w-full object-cover" />
    </div>
  );
}

export type SpecFormValue = string | number | File | null | undefined;

export interface DynamicFormProps {
  specifications: {
    id: number;
    name: string;
    type: 'text' | 'number' | 'select' | 'image';
    isRequired: boolean;
    values?: string[];
  }[];
  formData: Record<number, SpecFormValue>;
  onChange: (specificationId: number, value: SpecFormValue) => void;
  errors: Record<string, string>;
  layout?: 'default' | 'dashboard';
}

export default function DynamicForm({
  specifications,
  formData,
  onChange,
  errors,
  layout = 'default',
}: DynamicFormProps) {
  const handleImageChange = (specificationId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        onChange(specificationId, file);
      } else {

        window.alert('Please upload an image file (e.g. JPG, PNG)');
      }
    }
  };

  const handleImageRemove = (specificationId: number) => {
    onChange(specificationId, null);
  };

  const isDashboardLayout = layout === 'dashboard';

  if (!specifications || specifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <p className="text-lg font-semibold text-slate-700">No additional specifications required.</p>
        <p className="mt-1 text-sm text-slate-500">Click Next to proceed with your booking details.</p>
      </div>
    );
  }

  return (
    <div className={isDashboardLayout ? 'w-full' : 'space-y-6'}>
      {!isDashboardLayout && (
        <h2 className="text-xl font-semibold text-slate-900">Configure Service</h2>
      )}
      <p className={isDashboardLayout ? 'text-center text-sm font-medium text-slate-600' : 'mt-2 text-sm text-slate-500'}>
        Please provide the details below to customize your service
      </p>

      <div className={isDashboardLayout ? 'mx-auto mt-6 grid w-full max-w-5xl grid-cols-1 gap-x-16 gap-y-6 lg:grid-cols-2' : 'mt-6 space-y-6 max-w-xl mx-auto'}>
        {specifications.map((spec) => {
          const value = formData[spec.id];
          const hasError = !!errors[spec.name];
          const fieldId = `spec-${spec.name.replace(/\s+/g, '-').toLowerCase()}`;
          const fieldClass = `
            w-full rounded-xl border p-4 text-slate-950 outline-none bg-white transition-colors
            focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200
            ${isDashboardLayout ? 'h-14' : 'border-2'}
            ${hasError ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-slate-300'}
          `;

          return (
            <div
              key={spec.id}
              className={`flex flex-col ${isDashboardLayout && spec.type === 'image' ? 'lg:col-span-2' : ''}`}
            >
              <label htmlFor={fieldId} className="mb-2 text-sm font-medium text-slate-700 flex items-center justify-between">
                <span>
                  {spec.name} {spec.isRequired && <span className="text-red-500">*</span>}
                </span>
              </label>

              {spec.type === 'select' && (
                <div className="relative w-full">
                  <select
                    id={fieldId}
                    value={value as string || ''}
                    onChange={(e) => onChange(spec.id, e.target.value)}
                    className={`${fieldClass} appearance-none pr-10 cursor-pointer`}
                  >
                    <option value="">Select an option</option>
                    {spec.values?.map((val) => (
                      <option key={val} value={val}>
                        {val}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </div>
              )}

              {spec.type === 'number' && (
                <input
                  id={fieldId}
                  type="number"
                  value={value !== undefined && value !== null ? String(value) : ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    onChange(spec.id, val === '' ? '' : Number(val));
                  }}
                  placeholder={`Enter number...`}
                  className={fieldClass}
                />
              )}

              {spec.type === 'text' && (
                <input
                  id={fieldId}
                  type="text"
                  value={value as string || ''}
                  onChange={(e) => onChange(spec.id, e.target.value)}
                  placeholder={`Enter text...`}
                  className={fieldClass}
                />
              )}

              {spec.type === 'image' && (
                <div className="space-y-3">
                  {!value ? (
                    <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer hover:bg-slate-50 transition-colors ${hasError ? 'border-red-500' : 'border-slate-300 hover:border-emerald-500'
                      }`}>
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-xs text-slate-500">Click to upload image</p>
                      </div>
                      <input
                        id={fieldId}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageChange(spec.id, e)}
                      />
                    </label>
                  ) : (
                    <div className="flex items-start gap-4">
                      <ImagePreview file={value as File} />
                      <div className="flex flex-col space-y-2 mt-3">
                        <span className="text-sm font-medium text-slate-800 break-all max-w-50">
                          {(value as File).name}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleImageRemove(spec.id)}
                          className="w-fit rounded-lg bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Remove Image
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {hasError && (
                <p className="mt-1 text-sm text-red-600 font-medium">{errors[spec.name]}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
