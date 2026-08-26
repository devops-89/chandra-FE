'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { AuthControllers } from '@/api/authControllers';
import { type AddressData,initialAddressData } from '@/components/common/AddressForm';
import { validateSignup } from '@/lib/validator/signup.validator';
import { useAppDispatch } from '@/redux/hooks';
import { setCredentials } from '@/redux/slices/authSlice';
import { showSnackbar } from '@/redux/slices/snackbarSlice';
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



// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useSignupForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Form state
  const [form, setForm] = useState<SignupFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<SignupErrors>({});
  
  // Address State (Step 2)
  const [addressData, setAddressData] = useState<AddressData>(initialAddressData);
  const [addressError, setAddressError] = useState<string | null>(null);

  // Step state
  const [step, setStep] = useState<1 | 2>(1);
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
  };

  const extractError = (error: unknown): string => {
    const err = error as { response?: { data?: { message?: string }; status?: number }; request?: unknown };
    if (err?.response) {
      const status = err.response.status;
      const backendMsg = err.response.data?.message;
      if (backendMsg) return backendMsg;
      if (status === 401 || status === 403) return 'Invalid credentials';
      return 'Server error. Please try again.';
    } else if (err?.request !== undefined) {
      return 'Unable to reach the server. Please check your connection or try again later.';
    }
    return 'Something went wrong. Please try again.';
  };

  // ── Step 1: Validate form + call Generate OTP ─────────────────────────────

  // ── Step 1: Validate form + Move to Step 2 ──────────────────────────────
  const handleNextStep = () => {
    const validationErrors = validateSignup(form);
    
    // Defer terms check to step 2
    delete validationErrors.termsAccepted;

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setStep(2);
  };

  const handleBackStep = () => {
    setStep(1);
  };

  const handleAddressChange = (updates: Partial<AddressData>) => {
    setAddressData((prev) => ({ ...prev, ...updates }));
    setAddressError(null);
  };

  // ── Step 2: Validate address + call Generate OTP ──────────────────────────

  const handleAddressSubmit = async () => {
    if (!form.termsAccepted) return setAddressError('You must accept the terms and conditions');
    if (!addressData.fullAddress.trim()) return setAddressError('Street address is required');
    if (!addressData.city.trim()) return setAddressError('City is required');
    if (!addressData.state.trim()) return setAddressError('State is required');
    if (!addressData.pincode.trim()) return setAddressError('Pincode is required');
    if (!/^\d{6}$/.test(addressData.pincode.trim())) return setAddressError('Pincode must be exactly a 6-digit number');
    const latNum = parseFloat(addressData.latitude);
    const lngNum = parseFloat(addressData.longitude);
    if (isNaN(latNum) || isNaN(lngNum)) return setAddressError('Latitude and Longitude must be valid numbers');

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
      dispatch(showSnackbar({ message: extractError(error), severity: 'error' }));
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

      setShowOtpModal(false);

      const finalLabel =
        addressData.label === 'Other'
          ? addressData.customLabel.trim() || 'Other'
          : addressData.label;

      const formattedAddress = {
        latitude: parseFloat(addressData.latitude),
        longitude: parseFloat(addressData.longitude),
        fullAddress: addressData.fullAddress.trim(),
        city: addressData.city.trim(),
        state: addressData.state.trim(),
        pincode: addressData.pincode.trim(),
        label: finalLabel as 'Home' | 'Office' | 'Other',
        isDefault: addressData.isDefault,
      };

      // 2b. Register customer — use the username entered by the user
      await AuthControllers.registerCustomer({
        phone: form.phone.trim(),
        email: form.email.trim() || undefined,
        username: form.username.trim(),
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim() || undefined,
        password: form.password,
        customerAddress: formattedAddress,
      });

      // 2c. Auto-login with the registered credentials
      const phoneParts = form.phone.trim().split(' ');
      const rawPhone = phoneParts.length >= 2 ? phoneParts.slice(1).join('').replace(/\s/g, '') : form.phone.trim();

      const loginResponse = await AuthControllers.login({
        identifier: rawPhone,
        password: form.password,
      });

      const { user, tokens } = loginResponse.data;

      // Persist tokens + user — survives page refresh and tab close
      localStorage.setItem('user',         JSON.stringify(user));
      localStorage.setItem('accessToken',  tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);

      // Update Redux state
      dispatch(setCredentials({ user, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken }));

      // Redirect directly to customer dashboard
      router.push('/customer/dashboard');
    } catch (error: unknown) {
      dispatch(showSnackbar({ message: extractError(error), severity: 'error' }));
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
    step,
    form,
    errors,
    formApiError,
    addressData,
    addressError,
    isSendingOtp,
    handleChange,
    handleNextStep,
    handleBackStep,
    handleAddressChange,
    handleAddressSubmit,
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
