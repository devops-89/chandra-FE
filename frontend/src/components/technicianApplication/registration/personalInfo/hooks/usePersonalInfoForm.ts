'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { markStepComplete } from '@/lib/onboarding/onboardingProgress';
import {
  generateOtpService,
  verifyOtpService,
} from '@/services/auth.service';
import type { PersonalInfoFormData, ValidationErrors } from '@/types/technicianApplication/personalInfo.types';

// ─── Validators ───────────────────────────────────────────────────────────────

function validateFirstName(v: string): string | undefined {
  if (!v.trim()) return 'First name is required';
  if (v.trim().length < 2) return 'Minimum 2 characters';
}
function validateLastName(v: string): string | undefined {
  if (!v.trim()) return 'Last name is required';
  if (v.trim().length < 2) return 'Minimum 2 characters';
}
function validateUsername(v: string): string | undefined {
  if (!v.trim()) return 'Username is required';
  if (v.trim().length < 3) return 'Minimum 3 characters';
  if (!/^[a-zA-Z0-9_]+$/.test(v.trim())) return 'Only letters, numbers and underscores';
}
function validatePhone(v: string): string | undefined {
  if (!v.trim()) return 'Phone number is required';
  if (!/^\+?[0-9]{10,15}$/.test(v.replace(/\s/g, ''))) return 'Enter a valid phone number';
}
function validateEmail(v: string): string | undefined {
  if (!v.trim()) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Enter a valid email address';
}
function validatePassword(v: string): string | undefined {
  if (!v) return 'Password is required';
  if (v.length < 8) return 'Minimum 8 characters';
  if (!/[0-9]/.test(v)) return 'Must contain a number';
  if (!/[^a-zA-Z0-9]/.test(v)) return 'Must contain a symbol';
}

const FIELD_VALIDATORS: Record<
  keyof PersonalInfoFormData,
  (v: string) => string | undefined
> = {
  firstName:   validateFirstName,
  lastName:    validateLastName,
  username:    validateUsername,
  phoneNumber: validatePhone,
  email:       validateEmail,
  password:    validatePassword,
};

function validateAll(data: PersonalInfoFormData): ValidationErrors {
  return Object.fromEntries(
    Object.entries(FIELD_VALIDATORS).map(([k, fn]) => [k, fn(data[k as keyof PersonalInfoFormData])]),
  ) as ValidationErrors;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function usePersonalInfoForm() {
  const router   = useRouter();

  // ── Form state ───────────────────────────────────────────────────────────
  const [formData, setFormData] = useState<PersonalInfoFormData>({
    firstName: '', lastName: '', username: '', phoneNumber: '', email: '', password: '',
  });
  const [errors,  setErrors]  = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<keyof PersonalInfoFormData, boolean>>({
    firstName: false, lastName: false, username: false, phoneNumber: false, email: false, password: false,
  });

  // ── OTP state ────────────────────────────────────────────────────────────
  const [otpSent,     setOtpSent]     = useState(false);   // show OTP input after Send OTP
  const [otpVerified, setOtpVerified] = useState(false);   // enable Create Account
  const [otp,         setOtp]         = useState('');
  const [otpError,    setOtpError]    = useState('');
  const [sendingOtp,  setSendingOtp]  = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  // ── Registration state ───────────────────────────────────────────────────
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError,     setApiError]     = useState('');

  // ── Restore from sessionStorage on mount ───────────────────────────────────
  useEffect(() => {
    const saved = sessionStorage.getItem('registerData');
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved);
      const savedVerified = sessionStorage.getItem('registerOtpVerified') === 'true';
      const timer = window.setTimeout(() => {
        setFormData(parsed);
        if (savedVerified) {
          setOtpVerified(true);
        }
      }, 0);
      return () => window.clearTimeout(timer);
    } catch {
      // ignore malformed data
    }
  }, []);

  // ── Field change / blur ──────────────────────────────────────────────────
  const handleChange = useCallback(
    (field: keyof PersonalInfoFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (apiError) setApiError('');
      // Reset OTP state when phone or email changes after OTP was sent
      if ((field === 'phoneNumber' || field === 'email') && otpSent) {
        setOtpSent(false);
        setOtpVerified(false);
        setOtp('');
        setOtpError('');
      }
      if (!touched[field]) return;
      setErrors((prev) => ({ ...prev, [field]: FIELD_VALIDATORS[field](value) }));
    },
    [touched, apiError, otpSent],
  );

  const handleBlur = useCallback(
    (field: keyof PersonalInfoFormData) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      setErrors((prev) => ({ ...prev, [field]: FIELD_VALIDATORS[field](formData[field]) }));
    },
    [formData],
  );

  // ── Client-side validation (touches all fields) ──────────────────────────
  const validateForm = useCallback((): boolean => {
    const errs = validateAll(formData);
    setTouched({ firstName: true, lastName: true, username: true, phoneNumber: true, email: true, password: true });
    setErrors(errs);
    return !Object.values(errs).some(Boolean);
  }, [formData]);

  // ── Step 1: Send OTP ─────────────────────────────────────────────────────
  const handleSendOtp = useCallback(async (): Promise<void> => {
    // Validate only phone + email before sending OTP
    const phoneErr = validatePhone(formData.phoneNumber);
    const emailErr = validateEmail(formData.email);
    setTouched((p) => ({ ...p, phoneNumber: true, email: true }));
    setErrors((p) => ({ ...p, phoneNumber: phoneErr, email: emailErr }));
    if (phoneErr || emailErr) return;

    setOtpError('');
    setSendingOtp(true);
    try {
      await generateOtpService({
        email: formData.email.trim(),
        phone: formData.phoneNumber.trim(),
        role:  'TECHNICIAN',
      });
      setOtpSent(true);
      setOtpVerified(false);
      setOtp('');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      setOtpError(error?.response?.data?.message ?? error?.message ?? 'Failed to send OTP');
    } finally {
      setSendingOtp(false);
    }
  }, [formData.email, formData.phoneNumber]);

  // ── Step 2: Verify OTP ───────────────────────────────────────────────────
  const handleVerifyOtp = useCallback(async (): Promise<void> => {
    if (!otp.trim()) { setOtpError('Enter the OTP'); return; }
    setOtpError('');
    setVerifyingOtp(true);
    try {
      await verifyOtpService({
        email: formData.email.trim(),
        phone: formData.phoneNumber.trim(),
        otp:   otp.trim(),
      });
      setOtpVerified(true);
      setOtpError('');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      setOtpError(error?.response?.data?.message ?? error?.message ?? 'Invalid OTP');
      setOtpVerified(false);
    } finally {
      setVerifyingOtp(false);
    }
  }, [otp, formData.email, formData.phoneNumber]);

  // ── Step 3: Register ─────────────────────────────────────────────────────
  const handleRegister = useCallback(async (): Promise<void> => {
    if (!validateForm()) return;
    if (!otpVerified) { setApiError('Please verify your phone/email with OTP first'); return; }

    setApiError('');
    setIsSubmitting(true);
    try {
      // Save data client-side in sessionStorage
      sessionStorage.setItem('registerData', JSON.stringify(formData));
      sessionStorage.setItem('registerOtpVerified', 'true');

      markStepComplete(0);
      router.push('/technician/onboarding/skills-equipment');
    } catch (_err: unknown) {
      setApiError('Registration preparation failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, otpVerified, validateForm, router]);

  return {
    // form
    formData, errors, touched,
    handleChange, handleBlur,
    // otp
    otpSent, otpVerified, otp, otpError,
    sendingOtp, verifyingOtp,
    setOtp,
    handleSendOtp, handleVerifyOtp,
    // register
    isSubmitting, apiError,
    handleRegister,
  };
}
