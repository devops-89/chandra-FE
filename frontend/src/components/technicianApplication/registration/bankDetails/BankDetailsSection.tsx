'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

import AccountInformationCard from './AccountInformationCard';
import AutoDetectedBankInfo from './AutoDetectedBankInfo';
import BankDetailsFooter from './BankDetailsFooter';
import BankDetailsHeader from './BankDetailsHeader';
import PayoutMethodCard from './PayoutMethodCard';
import SecurityBanner from './SecurityBanner';
import VerificationDocumentsCard from './VerificationDocumentsCard';

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
  const [formData, setFormData] = useState({
    accountHolderName: '',
    ifscCode: '',
    accountNumber: '',
    confirmAccountNumber: '',
  });

  const [selectedPayoutMethod, setSelectedPayoutMethod] = useState<'bank-transfer' | 'upi'>(
    'bank-transfer'
  );

  const [uploadedFiles, setUploadedFiles] = useState({
    cancelledCheque: undefined as File | undefined,
    bankPassbook: undefined as File | undefined,
  });

  const handleFileUpload = (documentId: string, file: File) => {
    if (documentId === 'cancelled-cheque') {
      setUploadedFiles((prev) => ({
        ...prev,
        cancelledCheque: file,
      }));
    } else if (documentId === 'bank-passbook') {
      setUploadedFiles((prev) => ({
        ...prev,
        bankPassbook: file,
      }));
    }
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
        <AutoDetectedBankInfo />
      </motion.div>

      <motion.div variants={itemVariants}>
        <PayoutMethodCard
          selectedMethod={selectedPayoutMethod}
          onMethodChange={setSelectedPayoutMethod}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <VerificationDocumentsCard
          uploadedFiles={uploadedFiles}
          onFileUpload={handleFileUpload}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <SecurityBanner />
      </motion.div>

      {/* Navigation Footer */}
      <motion.div variants={itemVariants}>
        <BankDetailsFooter />
      </motion.div>

      {/* Spacer for visual separation */}
      <div className="h-8 md:h-12" />
    </motion.div>
  );
}
