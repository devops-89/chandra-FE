'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { handlePostAuthRedirect } from '@/lib/auth/redirectUtils';
import { validateSignup } from '@/lib/validator/signup.validator';
import { useAuthStore } from '@/store/useAuthStore';
import type {
  SignupErrors,
  SignupFormData,
} from '@/types/auth.types';

const INITIAL_FORM: SignupFormData = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
  termsAccepted: false,
};

export const useSignupForm = () => {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  
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
     * API Call Here - simulate successful signup
     */
    
    // Log the user in after successful signup
    login();
    
    // Handle redirect after successful signup
    const redirectPath = handlePostAuthRedirect();
    router.push(redirectPath);
   };

  return {
    form,
    errors,
    handleChange,
    handleSubmit,
  };
};