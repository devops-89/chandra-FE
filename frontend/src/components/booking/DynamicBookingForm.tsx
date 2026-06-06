'use client';

import { useState } from 'react';

import { calculateServicePrice } from '@/lib/pricing';
import { getFileTypeDescription, validateFiles } from '@/lib/validation/fileValidation';
import type {
  BookingFormData,
  BookingFormField,
  DynamicBookingFormProps,
} from '@/types/services.types';

export default function DynamicBookingForm({
  fields,
  service,
  onSubmit,
  isLoading = false,
}: DynamicBookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (name: string, value: string | number | boolean | File | File[]) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleFileChange = (field: BookingFormField, files: File[]) => {
    // Validate files before setting them
    const validation = validateFiles(files, field);
    
    if (!validation.isValid) {
      setErrors(prev => ({
        ...prev,
        [field.name]: validation.errors.join('. ')
      }));
      return;
    }

    // Clear any previous errors
    if (errors[field.name]) {
      setErrors(prev => ({
        ...prev,
        [field.name]: ''
      }));
    }

    // Set valid files
    if (field.type === 'multi-file') {
      handleInputChange(field.name, validation.validFiles);
    } else {
      handleInputChange(field.name, validation.validFiles[0] || null);
    }
  };

  const validateField = (field: BookingFormField, value: string | number | boolean | File | File[]): string => {
    if (field.required && (!value || value === '' || (Array.isArray(value) && value.length === 0))) {
      return `${field.label} is required`;
    }

    if (field.type === 'number' && value) {
      const numValue = Number(value);
      if (field.min && numValue < field.min) {
        return `${field.label} must be at least ${field.min}`;
      }
      if (field.max && numValue > field.max) {
        return `${field.label} must be no more than ${field.max}`;
      }
    }

    if (field.validation?.pattern && value) {
      const regex = new RegExp(field.validation.pattern);
      if (!regex.test(String(value))) {
        return field.validation.message || `${field.label} format is invalid`;
      }
    }

    return '';
  };

  const shouldShowField = (field: BookingFormField): boolean => {
    if (!field.conditional) return true;
    
    const dependentValue = formData[field.conditional.dependsOn];
    return field.conditional.values.includes(String(dependentValue || ''));
  };

  // Calculate price breakdown when form data changes
  const priceBreakdown = service.formConfig?.showPriceSummary 
    ? calculateServicePrice(service, formData, fields)
    : null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    // Validate all visible fields
    fields.forEach(field => {
      if (shouldShowField(field)) {
        const error = validateField(field, formData[field.name]);
        if (error) {
          newErrors[field.name] = error;
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  const renderField = (field: BookingFormField) => {
    if (!shouldShowField(field)) return null;

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
      ${errors[field.name] ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}
    `;

    const fieldId = `field-${field.name}`;

    switch (field.type) {
      case 'select':
        return (
          <select
            id={fieldId}
            value={formData[field.name] as string || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
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
            value={formData[field.name] as string || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className={commonClasses}
            required={field.required}
          />
        );

      case 'file':
        return (
          <div>
            <input
              id={fieldId}
              type="file"
              accept={field.accept}
              multiple={field.multiple}
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                handleFileChange(field, files);
              }}
              className={`
                ${commonClasses}
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
              `}
              required={field.required}
            />
            <p className="mt-1 text-xs text-slate-500">
              Accepted: {getFileTypeDescription(field.accept)}
              {field.maxFiles && ` • Max ${field.maxFiles} files`}
            </p>
          </div>
        );

      case 'multi-file':
        return (
          <div>
            <input
              id={fieldId}
              type="file"
              accept={field.accept}
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                handleFileChange(field, files);
              }}
              className={`
                ${commonClasses}
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
              `}
              required={field.required}
            />
            <p className="mt-1 text-xs text-slate-500">
              Accepted: {getFileTypeDescription(field.accept)}
              {field.maxFiles && ` • Max ${field.maxFiles} files`}
            </p>
            {Array.isArray(formData[field.name]) && (formData[field.name] as File[]).length > 0 && (
              <div className="mt-2 space-y-1">
                <p className="text-sm font-medium text-slate-700">Selected files:</p>
                {(formData[field.name] as File[]).map((file, index) => (
                  <div key={index} className="flex items-center justify-between text-sm text-slate-600 bg-slate-50 p-2 rounded">
                    <span>{file.name}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const currentFiles = formData[field.name] as File[];
                        const newFiles = currentFiles.filter((_, i) => i !== index);
                        handleInputChange(field.name, newFiles);
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'checkbox':
        return (
          <div className="flex items-center gap-3">
            <input
              id={fieldId}
              type="checkbox"
              checked={formData[field.name] as boolean || false}
              onChange={(e) => handleInputChange(field.name, e.target.checked)}
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
            value={formData[field.name] as number || ''}
            onChange={(e) => handleInputChange(field.name, Number(e.target.value))}
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
            value={formData[field.name] as string || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className={commonClasses}
            required={field.required}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {fields.map((field) => (
        <div key={field.name}>
          {field.type !== 'checkbox' && (
            <label
              htmlFor={`field-${field.name}`}
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
          )}
          
          {renderField(field)}
          
          {errors[field.name] && (
            <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
          )}
        </div>
      ))}

      {/* Dynamic Price Summary */}
      {service.formConfig?.showPriceSummary && priceBreakdown && priceBreakdown.totalPrice > 0 && (
        <div className="rounded-lg bg-emerald-50 p-4 border border-emerald-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-emerald-800 font-medium">Estimated Service Price:</span>
            <span className="text-2xl font-bold text-emerald-600">₹{priceBreakdown.totalPrice}</span>
          </div>
          
          {priceBreakdown.breakdown && priceBreakdown.breakdown.length > 0 && (
            <div className="space-y-1 text-sm text-emerald-700">
              {priceBreakdown.breakdown.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>{item.label}:</span>
                  <span className={item.type === 'discount' ? 'text-green-600' : ''}>
                    {item.type === 'discount' ? '-' : '+'}₹{item.amount}
                  </span>
                </div>
              ))}
            </div>
          )}
          
          <p className="text-xs text-emerald-700 mt-2">
            *Final price may vary based on site inspection and additional requirements
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="
          w-full
          rounded-full
          bg-emerald-600
          px-8
          py-4
          text-lg
          font-semibold
          text-white
          transition-all
          duration-300
          hover:bg-emerald-700
          hover:shadow-lg
          active:scale-95
          active:shadow-md
          disabled:opacity-50
          disabled:cursor-not-allowed
          flex
          items-center
          justify-center
          gap-2
        "
      >
        {isLoading ? (
          <>
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Processing...
          </>
        ) : (
          <>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Submit Service Request
          </>
        )}
      </button>
    </form>
  );
}