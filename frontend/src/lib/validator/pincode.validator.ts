export const validatePincode = (
  pincode: string,
): string | null => {
  if (!pincode) {
    return 'Pincode is required';
  }

  if (pincode.length !== 6) {
    return 'Pincode must be 6 digits';
  }

  return null;
};