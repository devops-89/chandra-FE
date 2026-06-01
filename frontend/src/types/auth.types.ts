export interface SignupFormData {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

export interface SignupErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  termsAccepted?: string;
}

export type SignupFieldsProps = {
  form: SignupFormData;
  errors: SignupErrors;
  onChange: (
    name: keyof SignupFormData,
    value: string,
  ) => void;
};