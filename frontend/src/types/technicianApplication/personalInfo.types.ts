export interface PersonalInfoFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
}

export interface ValidationErrors {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  password?: string;
}

export interface FieldError {
  hasError: boolean;
  message?: string;
}
