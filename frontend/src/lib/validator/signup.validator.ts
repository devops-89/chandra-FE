import type {
  SignupErrors,
  SignupFormData,
} from '@/types/auth.types';

import { validateEmail } from './email.validator';
import { validatePassword } from './password.validator';
import { validatePhone } from './phone.validator';

export const validateSignup = (
  values: SignupFormData,
): SignupErrors => {
  const errors: SignupErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = 'Full name is required';
  }

  const phoneError = validatePhone(
    values.phone,
  );

  if (phoneError) {
    errors.phone = phoneError;
  }

  const emailError = validateEmail(
    values.email,
  );

  if (emailError) {
    errors.email = emailError;
  }

  const passwordError =
    validatePassword(values.password);

  if (passwordError) {
    errors.password = passwordError;
  }

  if (
    values.password !==
    values.confirmPassword
  ) {
    errors.confirmPassword =
      'Passwords do not match';
  }

  if (!values.termsAccepted) {
    errors.termsAccepted =
      'Accept terms and conditions';
  }

  return errors;
};