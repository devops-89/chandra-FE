'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { markStepComplete } from '@/lib/onboarding/onboardingProgress';

import BankDetailsFooter from './BankDetailsFooter';
import BankDetailsHeader from './BankDetailsHeader';
import PayoutMethodCard from './PayoutMethodCard';
import SecurityBanner from './SecurityBanner';

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

export interface BankDetailsErrors {
  accountHolderName?: string;
  ifscCode?: string;
  accountNumber?: string;
  confirmAccountNumber?: string;
  upiId?: string;
}

export default function BankDetailsSection() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<BankDetailsErrors>({});

  const [formData, setFormData] = useState({
    accountHolderName: '',
    ifscCode: '',
    accountNumber: '',
    confirmAccountNumber: '',
    upiId: '',
  });

  const [selectedPayoutMethod, setSelectedPayoutMethod] = useState<'bank-transfer' | 'upi'>(
    'bank-transfer'
  );
  const hasRestoredDraft = useRef(false);

  // ── Restore from sessionStorage on mount ───────────────────────────────────
  useEffect(() => {
    const saved = sessionStorage.getItem('bankDetailsData');
    if (!saved) {
      hasRestoredDraft.current = true;
      return;
    }

    try {
      const parsed = JSON.parse(saved);
      const timer = window.setTimeout(() => {
        setFormData({
          accountHolderName: parsed.accountHolderName || '',
          ifscCode: parsed.ifscCode || '',
          accountNumber: parsed.accountNumber || '',
          confirmAccountNumber: parsed.accountNumber || '',
          upiId: parsed.upiId || '',
        });

        if (parsed.payoutMethod === 'bank-transfer' || parsed.payoutMethod === 'upi') {
          setSelectedPayoutMethod(parsed.payoutMethod);
        }
        hasRestoredDraft.current = true;
      }, 0);

      return () => window.clearTimeout(timer);
    } catch {
      hasRestoredDraft.current = true;
      console.error(Error('Failed to parse bank details from sessionStorage'));
    }
  }, []);

  const buildPayload = () => {
    if (selectedPayoutMethod === 'upi') {
      return {
        payoutMethod: 'upi' as const,
        upiId: formData.upiId,
      };
    }
    return {
      payoutMethod: 'bank-transfer' as const,
      accountHolderName: formData.accountHolderName,
      accountNumber: formData.accountNumber,
      ifscCode: formData.ifscCode,
      bankName: '',
    };
  };

  const validate = (): boolean => {
    const newErrors: BankDetailsErrors = {};

    if (selectedPayoutMethod === 'bank-transfer') {
      if (!formData.accountHolderName.trim()) {
        newErrors.accountHolderName = 'Account holder name is required';
      }
      if (!formData.ifscCode.trim()) {
        newErrors.ifscCode = 'IFSC code is required';
      }
      if (!formData.accountNumber.trim()) {
        newErrors.accountNumber = 'Account number is required';
      }
      if (!formData.confirmAccountNumber.trim()) {
        newErrors.confirmAccountNumber = 'Please confirm your account number';
      } else if (formData.accountNumber !== formData.confirmAccountNumber) {
        newErrors.confirmAccountNumber = 'Account numbers do not match';
      }
    } else {
      if (!formData.upiId.trim()) {
        newErrors.upiId = 'UPI ID is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (!hasRestoredDraft.current) return;

    const payload = buildPayload();
    const hasAnyValue =
      selectedPayoutMethod === 'upi'
        ? formData.upiId.trim() !== ''
        : Object.values({
            accountHolderName: formData.accountHolderName,
            accountNumber: formData.accountNumber,
            ifscCode: formData.ifscCode,
          }).some((v) => v.trim() !== '');

    if (!hasAnyValue) return;

    sessionStorage.setItem('bankDetailsData', JSON.stringify(payload));
  }, [formData, selectedPayoutMethod]);

  // Clear errors for the relevant field when method switches
  const handleMethodChange = (method: 'bank-transfer' | 'upi') => {
    setSelectedPayoutMethod(method);
    setErrors({});
  };

  const handleSaveContinue = () => {
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const payload = buildPayload();
      sessionStorage.setItem('bankDetailsData', JSON.stringify(payload));
      markStepComplete(4);
      router.push('/technician/onboarding/review-submit');
    }, 500);
  };

  return (
    <motion.div
      className="w-full max-w-4xl space-y-6 md:space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <BankDetailsHeader />
      </motion.div>

      <motion.div variants={itemVariants}>
        <PayoutMethodCard
          selectedMethod={selectedPayoutMethod}
          onMethodChange={handleMethodChange}
          accountHolderName={formData.accountHolderName}
          ifscCode={formData.ifscCode}
          accountNumber={formData.accountNumber}
          confirmAccountNumber={formData.confirmAccountNumber}
          onAccountHolderNameChange={(value) => {
            setFormData((prev) => ({ ...prev, accountHolderName: value }));
            if (errors.accountHolderName) setErrors((prev) => ({ ...prev, accountHolderName: undefined }));
          }}
          onIfscCodeChange={(value) => {
            setFormData((prev) => ({ ...prev, ifscCode: value.toUpperCase() }));
            if (errors.ifscCode) setErrors((prev) => ({ ...prev, ifscCode: undefined }));
          }}
          onAccountNumberChange={(value) => {
            setFormData((prev) => ({ ...prev, accountNumber: value }));
            if (errors.accountNumber) setErrors((prev) => ({ ...prev, accountNumber: undefined }));
          }}
          onConfirmAccountNumberChange={(value) => {
            setFormData((prev) => ({ ...prev, confirmAccountNumber: value }));
            if (errors.confirmAccountNumber) setErrors((prev) => ({ ...prev, confirmAccountNumber: undefined }));
          }}
          upiId={formData.upiId}
          onUpiIdChange={(value) => {
            setFormData((prev) => ({ ...prev, upiId: value }));
            if (errors.upiId) setErrors((prev) => ({ ...prev, upiId: undefined }));
          }}
          errors={errors}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <SecurityBanner />
      </motion.div>

      {/* Navigation Footer */}
      <motion.div variants={itemVariants}>
        <BankDetailsFooter onSubmit={handleSaveContinue} isLoading={isLoading} />
      </motion.div>

      {/* Spacer for visual separation */}
      <div className="h-8 md:h-12" />
    </motion.div>
  );
}
