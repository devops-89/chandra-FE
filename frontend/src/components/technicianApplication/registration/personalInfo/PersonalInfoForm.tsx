'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

import { markStepComplete } from '@/lib/onboarding/onboardingProgress';

import BasicInfoFields from './BasicInfoFields';
import ContinueButton from './ContinueButton';
import EmailAndPasswordFields from './EmailAndPasswordFields';
import EmailVerificationCard from './EmailVerificationCard';
import { usePersonalInfoForm } from './hooks/usePersonalInfoForm';
import MobileVerificationCard from './MobileVerificationCard';
import TermsAndPrivacy from './TermsAndPrivacy';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function PersonalInfoForm() {
  const { formData, errors, touched, handleChange, handleBlur, handleSubmit } =
    usePersonalInfoForm();
  const [showPassword, setShowPassword] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = handleSubmit();
    if (isValid) {
      markStepComplete(0);
    }
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
        <motion.div variants={itemVariants}>
          <BasicInfoFields
            fullName={formData.fullName}
            phoneNumber={formData.phoneNumber}
            email={formData.email}
            fullNameError={touched.fullName ? errors.fullName : undefined}
            phoneNumberError={touched.phoneNumber ? errors.phoneNumber : undefined}
            emailError={
              touched.email && formData.email && errors.email
                ? errors.email
                : undefined
            }
            onFullNameChange={(value) => handleChange('fullName', value)}
            onPhoneNumberChange={(value) => handleChange('phoneNumber', value)}
            onEmailChange={(value) => handleChange('email', value)}
            onFullNameBlur={() => handleBlur('fullName')}
            onPhoneNumberBlur={() => handleBlur('phoneNumber')}
            onEmailBlur={() => handleBlur('email')}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <EmailAndPasswordFields
            email={formData.email}
            password={formData.password}
            emailError={
              touched.email && formData.email && errors.email
                ? errors.email
                : undefined
            }
            passwordError={touched.password ? errors.password : undefined}
            onEmailChange={(value) => handleChange('email', value)}
            onPasswordChange={(value) => handleChange('password', value)}
            onEmailBlur={() => handleBlur('email')}
            onPasswordBlur={() => handleBlur('password')}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row justify-between gap-4"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="w-full md:w-1/2">
            <MobileVerificationCard />
          </motion.div>

          <motion.div variants={itemVariants} className="w-full md:w-1/2">
            <EmailVerificationCard />
          </motion.div>
        </motion.div>

        <motion.div className="space-y-2 md:space-y-3" variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <TermsAndPrivacy />
          </motion.div>

          <motion.div variants={itemVariants} className="pb-4 md:pb-0">
            <ContinueButton
              onClick={() => handleSubmit()}
              isDisabled={false}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.form>
  );
}
