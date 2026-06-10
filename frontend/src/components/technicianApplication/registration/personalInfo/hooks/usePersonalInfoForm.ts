'use client';

import { useCallback,useState } from 'react';

import type { PersonalInfoFormData, ValidationErrors } from '@/types/technicianApplication/personalInfo.types';
import { validateEmail, validateFullName, validatePassword,validatePersonalInfoForm, validatePhoneNumber } from '@/utils/validation/personalInfoValidation';

export function usePersonalInfoForm() {
  const [formData, setFormData] = useState<PersonalInfoFormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<keyof PersonalInfoFormData, boolean>>({
    fullName: false,
    phoneNumber: false,
    email: false,
    password: false,
  });

  const handleChange = useCallback((field: keyof PersonalInfoFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Real-time validation
    if (touched[field]) {
      let error: string | undefined;

      switch (field) {
        case 'fullName':
          error = validateFullName(value);
          break;
        case 'phoneNumber':
          error = validatePhoneNumber(value);
          break;
        case 'email':
          error = validateEmail(value);
          break;
        case 'password':
          error = validatePassword(value);
          break;
      }

      setErrors((prev) => ({
        ...prev,
        [field]: error,
      }));
    }
  }, [touched]);

  const handleBlur = useCallback((field: keyof PersonalInfoFormData) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));

    // Validate on blur
    let error: string | undefined;

    switch (field) {
      case 'fullName':
        error = validateFullName(formData[field]);
        break;
      case 'phoneNumber':
        error = validatePhoneNumber(formData[field]);
        break;
      case 'email':
        error = validateEmail(formData[field]);
        break;
      case 'password':
        error = validatePassword(formData[field]);
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  }, [formData]);

  const handleSubmit = useCallback((): boolean => {
    const validationErrors = validatePersonalInfoForm(formData);

    // Mark all fields as touched
    setTouched({
      fullName: true,
      phoneNumber: true,
      email: true,
      password: true,
    });

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData({
      fullName: '',
      phoneNumber: '',
      email: '',
      password: '',
    });
    setErrors({});
    setTouched({
      fullName: false,
      phoneNumber: false,
      email: false,
      password: false,
    });
  }, []);

  return {
    formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  };
}
