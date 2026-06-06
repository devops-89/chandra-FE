import { useCallback,useState } from 'react';

import type { BookingFormData, BookingFormField } from '@/types/services.types';

export interface UseFormValidationReturn {
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  validateField: (field: BookingFormField, value: string | number | boolean | File | File[]) => string;
  validateAllFields: (fields: BookingFormField[], formData: BookingFormData, shouldShowField: (field: BookingFormField) => boolean) => boolean;
  clearError: (fieldName: string) => void;
  setFieldError: (fieldName: string, error: string) => void;
}

export function useFormValidation(): UseFormValidationReturn {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = useCallback((field: BookingFormField, value: string | number | boolean | File | File[]): string => {
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
  }, []);

  const validateAllFields = useCallback((
    fields: BookingFormField[], 
    formData: BookingFormData, 
    shouldShowField: (field: BookingFormField) => boolean
  ): boolean => {
    const newErrors: Record<string, string> = {};
    
    fields.forEach(field => {
      if (shouldShowField(field)) {
        const error = validateField(field, formData[field.name]);
        if (error) {
          newErrors[field.name] = error;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [validateField]);

  const clearError = useCallback((fieldName: string) => {
    setErrors(prev => ({
      ...prev,
      [fieldName]: '',
    }));
  }, []);

  const setFieldError = useCallback((fieldName: string, error: string) => {
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  }, []);

  return {
    errors,
    setErrors,
    validateField,
    validateAllFields,
    clearError,
    setFieldError,
  };
}