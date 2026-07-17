'use client';

import type { BookingFormField } from '@/types/services.types';

export interface FormFieldProps {
  field: BookingFormField;
  value: string | number | boolean | File | File[];
  onChange: (name: string, value: string | number | boolean | File | File[]) => void;
  error?: string;
  shouldShow: boolean;
}

// Mandatory fields that require validation
// Solar Panel Cleaning mandatory fields
const SOLAR_MANDATORY_FIELDS = [
  'Number of Solar Panels',
  'Property Type',
  'Roof Type',
  'Preferred Cleaning Frequency',
];

// AC Servicing mandatory fields
const AC_MANDATORY_FIELDS = [
  'Service Type',
  'AC Type',
  'AC Brand',
  'Issue Description',
];

// Electrical Servicing mandatory fields
const ELECTRICAL_MANDATORY_FIELDS = [
  'Type of Electrical Service',
  'Property Type',
  'Urgency Level',
  'Problem Description',
];

// Plumber Servicing mandatory fields
const PLUMBER_MANDATORY_FIELDS = [
  'Service Required',
  'Problem Area',
  'Urgency Level',
  'Problem Description',
];

// Combined mandatory fields
const ALL_MANDATORY_FIELDS = [
  ...SOLAR_MANDATORY_FIELDS,
  ...AC_MANDATORY_FIELDS,
  ...ELECTRICAL_MANDATORY_FIELDS,
  ...PLUMBER_MANDATORY_FIELDS,
];

const validateMandatoryField = (field: BookingFormField, value: string | number | boolean | File | File[]): string | undefined => {
  // Check if this is a mandatory field
  if (ALL_MANDATORY_FIELDS.includes(field.label)) {
    // Check if value is empty/null/undefined
    if (value === '' || value === null || value === undefined) {
      return `${field.label} is required`;
    }

    // For arrays (File[])
    if (Array.isArray(value) && value.length === 0) {
      return `${field.label} is required`;
    }

    // For select fields, ensure a valid option is selected (not empty string)
    if (field.type === 'select' && value === '') {
      return `Please select a ${field.label}`;
    }

    // For number fields
    if (field.type === 'number' && (value === '' || value === 0)) {
      return `${field.label} must be greater than 0`;
    }
  }

  return undefined;
};

export default function FormField({ field, value, onChange, error, shouldShow }: FormFieldProps) {
  if (!shouldShow) return null;

  // Get validation error
  const validationError = validateMandatoryField(field, value);
  const displayError = error || validationError;

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
    ${displayError ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}
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

      // case 'textarea':
      //   return (
      //     <textarea
      //       id={fieldId}
      //       rows={4}
      //       value={value as string || ''}
      //       onChange={(e) => onChange(field.name, e.target.value)}
      //       placeholder={field.placeholder}
      //       className={commonClasses}
      //       required={field.required}
      //     />
      //   );

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
      
      {displayError && (
        <p className="mt-1 text-sm text-red-600 font-medium">{displayError}</p>
      )}
    </div>
  );
}