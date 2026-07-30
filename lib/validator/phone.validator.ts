import { matchIsValidTel } from 'mui-tel-input';

export const validatePhone = (
  phone: string,
): string | undefined => {
  if (!phone.trim()) {
    return 'Phone number is required';
  }

  if (!matchIsValidTel(phone)) {
    return 'Invalid phone number';
  }

  return undefined;
};