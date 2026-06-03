'use client';

import { useState } from 'react';

import { validateSignup } from '@/lib/validator/signup.validator';
import type {
  SignupErrors,
  SignupFormData,
} from '@/types/auth.types';

const INITIAL_FORM: SignupFormData = {
  fullName: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
  termsAccepted: false,
};

export const useSignupForm = () => {
  const [form, setForm] =
    useState<SignupFormData>(
      INITIAL_FORM,
    );

  const [errors, setErrors] =
    useState<SignupErrors>({});

  const handleChange = (
    name: keyof SignupFormData,
    value: string | boolean,
  ) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const handleSubmit = () => {
    const validationErrors =
      validateSignup(form);

    if (
      Object.keys(validationErrors)
        .length > 0
    ) {
      setErrors(validationErrors);
      return;
    }

    /**
     * API Call Here
     */
   };

  return {
    form,
    errors,
    handleChange,
    handleSubmit,
  };
};