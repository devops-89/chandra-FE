export const validatePhone = (
  phone: string,
): string | undefined => {
  if (!phone.trim()) {
    return 'Phone number is required';
  }

  const digits = phone.replace(/\D/g, '');

  if (digits.length !== 10) {
    return 'Phone number must be 10 digits';
  }

  return undefined;
};