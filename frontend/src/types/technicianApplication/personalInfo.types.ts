export interface PersonalInfoFormData {
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  email: string;
  password: string;
}

export interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  username?: string;
  phoneNumber?: string;
  email?: string;
  password?: string;
}

export interface FieldError {
  hasError: boolean;
  message?: string;
}
