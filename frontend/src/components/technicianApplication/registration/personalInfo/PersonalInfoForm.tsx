'use client';

import { AnimatePresence,motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import BasicInfoFields from './BasicInfoFields';
import ContinueButton from './ContinueButton';
import EmailAndPasswordFields from './EmailAndPasswordFields';
import { usePersonalInfoForm } from './hooks/usePersonalInfoForm';
import TermsAndPrivacy from './TermsAndPrivacy';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function PersonalInfoForm() {
  const {
    formData, errors, touched,
    handleChange, handleBlur,
    otpSent, otpVerified, otp, otpError, phoneAlreadyInUse,
    sendingOtp, verifyingOtp,
    setOtp,
    handleSendOtp, handleVerifyOtp,
    isSubmitting, apiError,
    handleRegister,
  } = usePersonalInfoForm();

  const [showPassword, setShowPassword] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleRegister();
  };

  return (
    <motion.form
      onSubmit={handleFormSubmit}
      className="border border-slate-200 shadow-lg bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 w-full max-w-4xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="space-y-6 md:space-y-8" variants={containerVariants}>

        {/* API error banner */}
        {apiError && (
          <motion.div
            variants={itemVariants}
            className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
            <p className="text-sm font-medium text-red-700">{apiError}</p>
          </motion.div>
        )}

        {/* Basic fields */}
        <motion.div variants={itemVariants}>
          <BasicInfoFields
            firstName={formData.firstName}
            lastName={formData.lastName}
            username={formData.username}
            phoneNumber={formData.phoneNumber}
            email={formData.email}
            firstNameError={touched.firstName    ? errors.firstName    : undefined}
            lastNameError={touched.lastName      ? errors.lastName     : undefined}
            usernameError={touched.username      ? errors.username     : undefined}
            phoneNumberError={touched.phoneNumber? errors.phoneNumber  : undefined}
            emailError={touched.email            ? errors.email        : undefined}
            onFirstNameChange={(v)   => handleChange('firstName',   v)}
            onLastNameChange={(v)    => handleChange('lastName',    v)}
            onUsernameChange={(v)    => handleChange('username',    v)}
            onPhoneNumberChange={(v) => handleChange('phoneNumber', v)}
            onEmailChange={(v)       => handleChange('email',       v)}
            onFirstNameBlur={()    => handleBlur('firstName')}
            onLastNameBlur={()     => handleBlur('lastName')}
            onUsernameBlur={()     => handleBlur('username')}
            onPhoneNumberBlur={()  => handleBlur('phoneNumber')}
            onEmailBlur={()        => handleBlur('email')}
          />
        </motion.div>

        {/* Password */}
        <motion.div variants={itemVariants}>
          <EmailAndPasswordFields
            password={formData.password}
            passwordError={touched.password ? errors.password : undefined}
            onPasswordChange={(v) => handleChange('password', v)}
            onPasswordBlur={()   => handleBlur('password')}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword((p) => !p)}
          />
        </motion.div>

        {/* ── OTP Section ───────────────────────────────────────────────── */}
        <motion.div variants={itemVariants} className="space-y-4">

          {/* Send OTP button + verified badge */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={sendingOtp || otpVerified}
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-5 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {sendingOtp && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {otpSent && !otpVerified ? 'Resend Mobile OTP' : 'Send Mobile OTP'}
            </button>

            {otpVerified && (
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
                <CheckCircle2 className="h-4 w-4" />
                Mobile verified
              </span>
            )}
          </div>

          {/* OTP error (from send or verify) */}
          {otpError && !otpVerified && (
            phoneAlreadyInUse ? (
              <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                <p className="text-sm font-medium text-amber-800">
                  {otpError}{' '}
                  <Link
                    href="/login"
                    className="font-semibold underline underline-offset-2 hover:text-amber-900"
                  >
                    Log in instead
                  </Link>
                </p>
              </div>
            ) : (
              <p className="text-xs font-medium text-red-600">{otpError}</p>
            )
          )}

          {/* OTP input — shown only after successful send */}
          <AnimatePresence>
            {otpSent && !otpVerified && (
              <motion.div
                key="otp-input"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <label className="mb-2 block text-xs font-medium md:text-sm">
                      Enter Mobile OTP
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      placeholder="6-digit mobile OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      className="w-full h-12 border border-slate-300 rounded-lg md:rounded-xl px-4 text-sm tracking-widest focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={verifyingOtp || otp.length < 4}
                    className="h-12 rounded-xl bg-emerald-600 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 flex items-center gap-2"
                  >
                    {verifyingOtp && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                    Verify OTP
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Terms + Submit */}
        <motion.div className="space-y-2 md:space-y-3" variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <TermsAndPrivacy />
          </motion.div>

          <motion.div variants={itemVariants} className="pb-4 md:pb-0">
            <ContinueButton
              onClick={() => {}}
              isDisabled={isSubmitting || !otpVerified}
              label={isSubmitting ? 'Creating Account...' : 'Create Account'}
            />
          </motion.div>
        </motion.div>

      </motion.div>
    </motion.form>
  );
}
