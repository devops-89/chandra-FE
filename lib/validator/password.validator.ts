export const validatePassword = (
  password: string,
): string | undefined => {
  if (!password) {
    return 'Password is required';
  }

  if (password.length < 8) {
    return 'Minimum 8 characters required';
  }

  return undefined;
};