export interface SignupFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

export interface SignupErrors {
  firstName?: string;
  lastName?: string;
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