export const validateIdentifier = (
  identifier: string,
): string | undefined => {
  const value = identifier.trim();

  if (!value) {
    return 'Email or mobile number is required';
  }

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isPhone = /^\d{10}$/.test(value);

  if (!isEmail && !isPhone) {
    return 'Enter a valid email or 10-digit mobile number';
  }

  return undefined;
};
