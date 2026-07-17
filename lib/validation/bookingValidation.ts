export interface BookingValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateName = (
  name: string
): BookingValidationResult => {
  if (!name.trim()) {
    return {
      isValid: false,
      error: 'Name is required',
    };
  }

  return {
    isValid: true,
  };
};

export const validatePhone = (
  phone: string
): BookingValidationResult => {
  if (!phone.trim()) {
    return {
      isValid: false,
      error: 'Phone number is required',
    };
  }

  if (!/^\d{10}$/.test(phone)) {
    return {
      isValid: false,
      error: 'Enter valid 10 digit phone number',
    };
  }

  return {
    isValid: true,
  };
};

export const validateDateTime = (
  date: string,
  slot: string
): BookingValidationResult => {
  if (!date) {
    return {
      isValid: false,
      error: 'Please select preferred date',
    };
  }

  if (!slot) {
    return {
      isValid: false,
      error: 'Please select a time slot',
    };
  }

  return {
    isValid: true,
  };
};

export function validateBookingForm(
  name: string,
  phone: string,
  date: string,
  slot: string
): BookingValidationResult {
  const nameResult = validateName(name);

  if (!nameResult.isValid) {
    return nameResult;
  }

  const phoneResult = validatePhone(phone);

  if (!phoneResult.isValid) {
    return phoneResult;
  }

  const dateTimeResult = validateDateTime(
    date,
    slot
  );

  if (!dateTimeResult.isValid) {
    return dateTimeResult;
  }

  return {
    isValid: true,
  };
}