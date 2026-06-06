'use client';

import { useMemo, useState } from 'react';

import { useFormValidation } from '@/hooks';
import { calculateServicePrice } from '@/lib/pricing';
import { validateFiles } from '@/lib/validation/fileValidation';
import type {
  BookingFormData,
  BookingFormField,
  DynamicBookingFormProps,
} from '@/types/services.types';

import { FileField, FormField } from './fields';
import PriceSummary from './PriceSummary';
import SubmitButton from './SubmitButton';

export default function DynamicBookingForm({
  fields,
  service,
  onSubmit,
  isLoading = false,
}: DynamicBookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>({});
  const { errors, validateAllFields, clearError, setFieldError } = useFormValidation();

  const handleInputChange = (name: string, value: string | number | boolean | File | File[]) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    clearError(name);
  };

  const handleFileChange = (field: BookingFormField, files: File[]) => {
    // Validate files before setting them
    const validation = validateFiles(files, field);
    
    if (!validation.isValid) {
      setFieldError(field.name, validation.errors.join('. '));
      return;
    }

    // Clear any previous errors
    clearError(field.name);

    // Set valid files
    if (field.type === 'multi-file') {
      handleInputChange(field.name, validation.validFiles);
    } else {
      handleInputChange(field.name, validation.validFiles[0] || null);
    }
  };

  const shouldShowField = (field: BookingFormField): boolean => {
    if (!field.conditional) return true;
    
    const dependentValue = formData[field.conditional.dependsOn];
    return field.conditional.values.includes(String(dependentValue || ''));
  };

  // Calculate price breakdown when form data changes
  const priceBreakdown = useMemo(() => 
    service.formConfig?.showPriceSummary 
      ? calculateServicePrice(service, formData, fields)
      : null,
    [service, formData, fields]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate all visible fields
    const isValid = validateAllFields(fields, formData, shouldShowField);
    
    if (!isValid) {
      return;
    }

    onSubmit(formData);
  };

  const renderField = (field: BookingFormField) => {
    const shouldShow = shouldShowField(field);
    
    if (field.type === 'file' || field.type === 'multi-file') {
      return (
        <FileField
          key={field.name}
          field={field}
          value={formData[field.name] as File | File[]}
          onChange={handleFileChange}
          error={errors[field.name]}
          shouldShow={shouldShow}
        />
      );
    }

    return (
      <FormField
        key={field.name}
        field={field}
        value={formData[field.name]}
        onChange={handleInputChange}
        error={errors[field.name]}
        shouldShow={shouldShow}
      />
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {fields.map(renderField)}

      <PriceSummary 
        priceBreakdown={priceBreakdown}
        showSummary={service.formConfig?.showPriceSummary}
      />

      <SubmitButton isLoading={isLoading} />
    </form>
  );
}