export const validateEmail = (
  email: string,
): string | undefined => {
  if (!email.trim()) {
    return 'Email is required';
  }

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return 'Enter a valid email';
  }

  return undefined;
};