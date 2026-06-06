'use client';

import type { BookingFormField } from '@/types/services.types';

export interface FormFieldProps {
  field: BookingFormField;
  value: string | number | boolean | File | File[];
  onChange: (name: string, value: string | number | boolean | File | File[]) => void;
  error?: string;
  shouldShow: boolean;
}

export default function FormField({ field, value, onChange, error, shouldShow }: FormFieldProps) {
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
  `;

  const fieldId = `field-${field.name}`;

  const renderFieldInput = () => {
    switch (field.type) {
      case 'select':
        return (
          <select
            id={fieldId}
            value={value as string || ''}
            onChange={(e) => onChange(field.name, e.target.value)}
            className={commonClasses}
            required={field.required}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
                {option.price && option.price !== 0 && ` (+₹${option.price})`}
              </option>
            ))}
          </select>
        );

      case 'textarea':
        return (
          <textarea
            id={fieldId}
            rows={4}
            value={value as string || ''}
            onChange={(e) => onChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className={commonClasses}
            required={field.required}
          />
        );

      case 'checkbox':
        return (
          <div className="flex items-center gap-3">
            <input
              id={fieldId}
              type="checkbox"
              checked={value as boolean || false}
              onChange={(e) => onChange(field.name, e.target.checked)}
              className="h-5 w-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              required={field.required}
            />
            <label htmlFor={fieldId} className="text-sm text-slate-700">
              {field.label}
            </label>
          </div>
        );

      case 'number':
        return (
          <input
            id={fieldId}
            type="number"
            value={value as number || ''}
            onChange={(e) => onChange(field.name, Number(e.target.value))}
            placeholder={field.placeholder}
            min={field.min}
            max={field.max}
            className={commonClasses}
            required={field.required}
          />
        );

      default:
        return (
          <input
            id={fieldId}
            type={field.type}
            value={value as string || ''}
            onChange={(e) => onChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className={commonClasses}
            required={field.required}
          />
        );
    }
  };

  return (
    <div>
      {field.type !== 'checkbox' && (
        <label
          htmlFor={fieldId}
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          {field.label} {field.required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      {renderFieldInput()}
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}