'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { markStepComplete } from '@/lib/onboarding/onboardingProgress';

import AccountInformationCard from './AccountInformationCard';
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

export default function BankDetailsSection() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    if (!hasRestoredDraft.current) return;

    const hasAnyBankValue = Object.values(formData).some((value) => value.trim() !== '');
    if (!hasAnyBankValue && selectedPayoutMethod === 'bank-transfer') return;

    sessionStorage.setItem('bankDetailsData', JSON.stringify({
      accountHolderName: formData.accountHolderName,
      accountNumber: formData.accountNumber,
      ifscCode: formData.ifscCode,
      bankName: '',
      payoutMethod: selectedPayoutMethod,
      upiId: formData.upiId,
    }));
  }, [formData, selectedPayoutMethod]);

  const handleSaveContinue = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const payload = {
        accountHolderName: formData.accountHolderName,
        accountNumber: formData.accountNumber,
        ifscCode: formData.ifscCode,
        bankName: '',
        payoutMethod: selectedPayoutMethod,
        upiId: formData.upiId,
      };
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
        <AccountInformationCard
          accountHolderName={formData.accountHolderName}
          ifscCode={formData.ifscCode}
          accountNumber={formData.accountNumber}
          confirmAccountNumber={formData.confirmAccountNumber}
          onAccountHolderNameChange={(value) =>
            setFormData((prev) => ({ ...prev, accountHolderName: value }))
          }
          onIfscCodeChange={(value) =>
            setFormData((prev) => ({ ...prev, ifscCode: value }))
          }
          onAccountNumberChange={(value) =>
            setFormData((prev) => ({ ...prev, accountNumber: value }))
          }
          onConfirmAccountNumberChange={(value) =>
            setFormData((prev) => ({ ...prev, confirmAccountNumber: value }))
          }
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <PayoutMethodCard
          selectedMethod={selectedPayoutMethod}
          onMethodChange={setSelectedPayoutMethod}
          upiId={formData.upiId}
          onUpiIdChange={(value) =>
            setFormData((prev) => ({ ...prev, upiId: value }))
          }
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
