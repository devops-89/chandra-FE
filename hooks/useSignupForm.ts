'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { AuthControllers } from '@/api/authControllers';
import { handlePostAuthRedirect } from '@/lib/authApi/redirectUtils';
import { validateSignup } from '@/lib/validator/signup.validator';
import { useAppDispatch } from '@/redux/hooks';
import { setCredentials } from '@/redux/slices/authSlice';
import type { SignupErrors, SignupFormData } from '@/types/auth.types';

// ─── Constants ────────────────────────────────────────────────────────────────

const INITIAL_FORM: SignupFormData = {
  firstName: '',
  lastName: '',
  username: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
  termsAccepted: false,
};

/** Default customer address — city/state/pincode filled by user later in profile */
const DEFAULT_ADDRESS = {
  latitude: 28.6139,
  longitude: 77.209,
  fullAddress: '',
  city: '',
  state: '',
  pincode: '',
  label: 'Home' as const,
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useSignupForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Form state
  const [form, setForm] = useState<SignupFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<SignupErrors>({});

  // Step state — controls whether the OTP modal is open
  const [showOtpModal, setShowOtpModal] = useState(false);

  // Loading flags — each step gets its own flag for accurate button states
  const [isSendingOtp, setIsSendingOtp] = useState(false);   // "Create account" button
  const [isVerifying, setIsVerifying] = useState(false);      // "Verify OTP" button
  const [isResending, setIsResending] = useState(false);      // "Resend OTP" link

  // Error state — separate for form-level and OTP-modal-level errors
  const [formApiError, setFormApiError] = useState<string>('');
  const [otpApiError, setOtpApiError] = useState<string>('');

  // ── Helpers ───────────────────────────────────────────────────────────────

  const handleChange = (name: keyof SignupFormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (formApiError) setFormApiError('');
  };

  const extractError = (error: unknown): string => {
    const err = error as { response?: { data?: { message?: string } } };
    return err?.response?.data?.message ?? 'Something went wrong. Please try again.';
  };

  // ── Step 1: Validate form + call Generate OTP ─────────────────────────────

  const handleSubmit = async () => {
    const validationErrors = validateSignup(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setFormApiError('');
      setIsSendingOtp(true);

      await AuthControllers.generateOtp({
        phone: form.phone.trim(),
        role: 'CUSTOMER',
      });

      // OTP sent — open the modal
      setShowOtpModal(true);
    } catch (error: unknown) {
      setFormApiError(extractError(error));
    } finally {
      setIsSendingOtp(false);
    }
  };

  // ── Step 2: Verify OTP → Register → Auto-login ───────────────────────────

  const handleVerifyOtp = async (otp: string) => {
    try {
      setOtpApiError('');
      setIsVerifying(true);

      // 2a. Verify OTP
      await AuthControllers.verifyOtp({
        phone: form.phone.trim(),
        otp,
      });

      // 2b. Register customer — use the username entered by the user
      await AuthControllers.registerCustomer({
        phone: form.phone.trim(),
        email: form.email.trim() || undefined,
        username: form.username.trim(),
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim() || undefined,
        password: form.password,
        customerAddress: DEFAULT_ADDRESS,
      });

      // 2c. Auto-login with the registered credentials
      const loginResponse = await AuthControllers.login({
        identifier: form.phone.trim(),
        password: form.password,
      });

      const { user, tokens } = loginResponse.data;

      // Persist tokens + user — survives page refresh and tab close
      localStorage.setItem('user',         JSON.stringify(user));
      localStorage.setItem('accessToken',  tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);

      // Update Redux state
      dispatch(setCredentials({ user, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken }));

      // Redirect
      const redirectPath = handlePostAuthRedirect();
      router.push(redirectPath);
    } catch (error: unknown) {
      setOtpApiError(extractError(error));
    } finally {
      setIsVerifying(false);
    }
  };

  // ── Step 2b (resend): call Generate OTP again ────────────────────────────

  const handleResendOtp = async () => {
    try {
      setOtpApiError('');
      setIsResending(true);

      await AuthControllers.generateOtp({
        phone: form.phone.trim(),
        role: 'CUSTOMER',
      });
    } catch (error: unknown) {
      setOtpApiError(extractError(error));
    } finally {
      setIsResending(false);
    }
  };

  const handleCloseOtpModal = () => {
    setShowOtpModal(false);
    setOtpApiError('');
  };

  // ─────────────────────────────────────────────────────────────────────────

  return {
    // Form
    form,
    errors,
    formApiError,
    isSendingOtp,
    handleChange,
    handleSubmit,
    // OTP modal
    showOtpModal,
    otpApiError,
    isVerifying,
    isResending,
    handleVerifyOtp,
    handleResendOtp,
    handleCloseOtpModal,
  };
};
