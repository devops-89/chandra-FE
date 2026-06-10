import type { PersonalInfoFormData, ValidationErrors } from '@/types/technicianApplication/personalInfo.types';

const VALIDATION_RULES = {
  fullName: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s]*$/,
  },
  phoneNumber: {
    pattern: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    minLength: 8,
    pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/,
  },
};

export function validateFullName(fullName: string): string | undefined {
  const trimmed = fullName.trim();

  if (!trimmed) {
    return 'Full name is required';
  }

  if (trimmed.length < VALIDATION_RULES.fullName.minLength) {
    return `Full name must be at least ${VALIDATION_RULES.fullName.minLength} characters`;
  }

  if (trimmed.length > VALIDATION_RULES.fullName.maxLength) {
    return `Full name must not exceed ${VALIDATION_RULES.fullName.maxLength} characters`;
  }

  if (!VALIDATION_RULES.fullName.pattern.test(trimmed)) {
    return 'Full name can only contain letters and spaces';
  }

  return undefined;
}

export function validatePhoneNumber(phoneNumber: string): string | undefined {
  const trimmed = phoneNumber.trim();

  if (!trimmed) {
    return 'Phone number is required';
  }

  if (!VALIDATION_RULES.phoneNumber.pattern.test(trimmed)) {
    return 'Please enter a valid phone number';
  }

  return undefined;
}

export function validateEmail(email: string): string | undefined {
  const trimmed = email.trim();

  if (!trimmed) {
    return 'Email is required';
  }

  if (!VALIDATION_RULES.email.pattern.test(trimmed)) {
    return 'Please enter a valid email address';
  }

  return undefined;
}

export function validatePassword(password: string): string | undefined {
  if (!password) {
    return 'Password is required';
  }

  if (password.length < VALIDATION_RULES.password.minLength) {
    return `Password must be at least ${VALIDATION_RULES.password.minLength} characters`;
  }

  if (!VALIDATION_RULES.password.pattern.test(password)) {
    return 'Password must contain at least one number and one symbol (!@#$%^&*)';
  }

  return undefined;
}

export function validatePersonalInfoForm(formData: PersonalInfoFormData): ValidationErrors {
  const errors: ValidationErrors = {};

  const fullNameError = validateFullName(formData.fullName);
  if (fullNameError) {
    errors.fullName = fullNameError;
  }

  const phoneError = validatePhoneNumber(formData.phoneNumber);
  if (phoneError) {
    errors.phoneNumber = phoneError;
  }

  const emailError = validateEmail(formData.email);
  if (emailError) {
    errors.email = emailError;
  }

  const passwordError = validatePassword(formData.password);
  if (passwordError) {
    errors.password = passwordError;
  }

  return errors;
}
