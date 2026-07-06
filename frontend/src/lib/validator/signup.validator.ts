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

  if (!values.firstName.trim()) {
    errors.firstName = 'First name is required';
  } else if (!/^[A-Za-z\s'-]+$/.test(values.firstName.trim())) {
    errors.firstName = 'First name must contain letters only';
  }

  if (values.lastName.trim() && !/^[A-Za-z\s'-]+$/.test(values.lastName.trim())) {
    errors.lastName = 'Last name must contain letters only';
  }

  const phoneError = validatePhone(
    values.phone,
  );

  if (phoneError) {
    errors.phone = phoneError;
  }

  const email = values.email.trim();

  if (email) {
    const emailError = validateEmail(email);

    if (emailError) {
      errors.email = emailError;
    }
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
