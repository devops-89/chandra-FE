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

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface LoginResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    message: string;
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
    user: User;
  };
}