'use client';

import { getFileTypeDescription } from '@/lib/validation/fileValidation';
import type { BookingFormField } from '@/types/services.types';

export interface FileFieldProps {
  field: BookingFormField;
  value: File | File[] | undefined;
  onChange: (field: BookingFormField, files: File[]) => void;
  error?: string;
  shouldShow: boolean;
}

export default function FileField({ field, value, onChange, error, shouldShow }: FileFieldProps) {
  if (!shouldShow) return null;

  const commonClasses = `
    w-full
    rounded-xl
    border-2
    border-slate-300
    p-4
    text-slate-950
    outline-none
    transition-colors
    focus:border-emerald-500
    focus:ring-2
    focus:ring-emerald-200
    ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}
    file:mr-4
    file:py-2
    file:px-4
    file:rounded-full
    file:border-0
    file:text-sm
    file:font-semibold
    file:bg-emerald-50
    file:text-emerald-700
    hover:file:bg-emerald-100
  `;

  const fieldId = `field-${field.name}`;

  const handleFileChange = (files: File[]) => {
    onChange(field, files);
  };

  const removeFile = (index: number) => {
    if (Array.isArray(value)) {
      const newFiles = value.filter((_, i) => i !== index);
      onChange(field, newFiles);
    }
  };

  return (
    <div>
      <label
        htmlFor={fieldId}
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        {field.label} {field.required && <span className="text-red-500">*</span>}
      </label>
      
      <input
        id={fieldId}
        type="file"
        accept={field.accept}
        multiple={field.multiple || field.type === 'multi-file'}
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          handleFileChange(files);
        }}
        className={commonClasses}
        required={field.required}
      />
      
      <p className="mt-1 text-xs text-slate-500">
        Accepted: {getFileTypeDescription(field.accept)}
        {field.maxFiles && ` • Max ${field.maxFiles} files`}
      </p>

      {/* Show selected files for multi-file uploads */}
      {field.type === 'multi-file' && Array.isArray(value) && value.length > 0 && (
        <div className="mt-2 space-y-1">
          <p className="text-sm font-medium text-slate-700">Selected files:</p>
          {value.map((file, index) => (
            <div key={index} className="flex items-center justify-between text-sm text-slate-600 bg-slate-50 p-2 rounded">
              <span>{file.name}</span>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}