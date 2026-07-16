'use client';

import { motion } from 'framer-motion';

import { PAYOUT_METHOD_OPTIONS } from '@/data/technicianApplication/bankDetailsData';

import type { BankDetailsErrors } from './BankDetailsSection';

interface PayoutMethodCardProps {
  selectedMethod: 'bank-transfer' | 'upi';
  onMethodChange: (method: 'bank-transfer' | 'upi') => void;
  // Bank transfer fields
  accountHolderName: string;
  ifscCode: string;
  accountNumber: string;
  confirmAccountNumber: string;
  onAccountHolderNameChange: (value: string) => void;
  onIfscCodeChange: (value: string) => void;
  onAccountNumberChange: (value: string) => void;
  onConfirmAccountNumberChange: (value: string) => void;
  // UPI fields
  upiId: string;
  onUpiIdChange: (value: string) => void;
  // Errors
  errors: BankDetailsErrors;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-red-500 mt-1">{message}</p>;
}

function inputClass(hasError: boolean) {
  return `w-full px-4 py-3 rounded-xl border-2 bg-transparent text-sm text-on-surface placeholder:text-secondary/50 focus:outline-none transition-colors duration-200 ${
    hasError
      ? 'border-red-400 focus:border-red-500'
      : 'border-outline-variant focus:border-primary'
  }`;
}

export default function PayoutMethodCard({
  selectedMethod,
  onMethodChange,
  accountHolderName,
  ifscCode,
  accountNumber,
  confirmAccountNumber,
  onAccountHolderNameChange,
  onIfscCodeChange,
  onAccountNumberChange,
  onConfirmAccountNumberChange,
  upiId,
  onUpiIdChange,
  errors,
}: PayoutMethodCardProps) {
  return (
    <motion.section
      className="bg-surface-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-ambient border border-outline-variant/30"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h3
        className="text-xs md:text-sm font-bold text-primary mb-6 uppercase tracking-wider"
        variants={itemVariants}
      >
        Payout Method
      </motion.h3>

      {/* Method selector */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4" variants={containerVariants}>
        {PAYOUT_METHOD_OPTIONS.map((option) => (
          <motion.div
            key={option.id}
            onClick={() => onMethodChange(option.id as 'bank-transfer' | 'upi')}
            className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
              selectedMethod === option.id
                ? 'border-primary bg-primary/5'
                : 'border-outline-variant hover:border-outline'
            }`}
            variants={itemVariants}
            whileHover={{ y: -2 }}
          >
            <input
              type="radio"
              name="payout-method"
              value={option.id}
              checked={selectedMethod === option.id}
              onChange={() => onMethodChange(option.id as 'bank-transfer' | 'upi')}
              className="hidden"
            />
            {selectedMethod === option.id ? (
              <span
                className="material-symbols-outlined text-primary mr-3 text-xl shrink-0"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            ) : (
              <div className="w-6 h-6 rounded-full border-2 border-outline-variant mr-3 shrink-0" />
            )}
            <div className="flex flex-col">
              <span className="text-xs md:text-sm font-medium text-on-surface">{option.label}</span>
              <span className="text-xs text-secondary">{option.description}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bank Transfer fields */}
      {selectedMethod === 'bank-transfer' && (
        <motion.div
          className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Account Holder Name */}
          <div className="flex flex-col gap-1">
            <label className="text-xs md:text-sm font-medium text-on-surface">
              Account Holder Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="As per bank records"
              value={accountHolderName}
              onChange={(e) => onAccountHolderNameChange(e.target.value)}
              className={inputClass(!!errors.accountHolderName)}
            />
            <FieldError message={errors.accountHolderName} />
          </div>

          {/* IFSC Code */}
          <div className="flex flex-col gap-1">
            <label className="text-xs md:text-sm font-medium text-on-surface">
              IFSC Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. HDFC0001234"
              value={ifscCode}
              onChange={(e) => onIfscCodeChange(e.target.value)}
              className={inputClass(!!errors.ifscCode)}
            />
            <FieldError message={errors.ifscCode} />
          </div>

          {/* Bank Account Number */}
          <div className="flex flex-col gap-1">
            <label className="text-xs md:text-sm font-medium text-on-surface">
              Bank Account Number <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="Enter account number"
              value={accountNumber}
              onChange={(e) => onAccountNumberChange(e.target.value)}
              className={inputClass(!!errors.accountNumber)}
            />
            <FieldError message={errors.accountNumber} />
          </div>

          {/* Confirm Account Number */}
          <div className="flex flex-col gap-1">
            <label className="text-xs md:text-sm font-medium text-on-surface">
              Confirm Account Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Re-enter account number"
              value={confirmAccountNumber}
              onChange={(e) => onConfirmAccountNumberChange(e.target.value)}
              className={inputClass(!!errors.confirmAccountNumber)}
            />
            <FieldError message={errors.confirmAccountNumber} />
          </div>
        </motion.div>
      )}

      {/* UPI ID field */}
      {selectedMethod === 'upi' && (
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <label htmlFor="upi-id" className="block text-xs md:text-sm font-medium text-on-surface mb-2">
            UPI ID <span className="text-red-500">*</span>
          </label>
          <input
            id="upi-id"
            type="text"
            value={upiId}
            onChange={(e) => onUpiIdChange(e.target.value)}
            placeholder="e.g. yourname@upi"
            className={inputClass(!!errors.upiId)}
          />
          <FieldError message={errors.upiId} />
        </motion.div>
      )}
    </motion.section>
  );
}
