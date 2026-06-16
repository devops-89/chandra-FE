'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { handlePostAuthRedirect } from '@/lib/authApi/redirectUtils';
import { validateSignup } from '@/lib/validator/signup.validator';
import { useAppDispatch } from '@/redux/hooks';
import { setCredentials } from '@/redux/slices/authSlice';
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
  const dispatch = useAppDispatch();

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
    dispatch(
      setCredentials({
        user: {
          id: 1,
          email: form.email,
          username: `${form.firstName.toLowerCase()}_${form.lastName.toLowerCase()}`,
          firstName: form.firstName,
          lastName: form.lastName,
          role: 'customer',
        },
        accessToken: 'dummy-access-token',
        refreshToken: 'dummy-refresh-token',
      })
    );

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