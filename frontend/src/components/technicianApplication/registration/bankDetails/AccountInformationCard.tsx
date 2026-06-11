'use client';

import { motion } from 'framer-motion';

interface AccountInformationCardProps {
  accountHolderName: string;
  ifscCode: string;
  accountNumber: string;
  confirmAccountNumber: string;
  onAccountHolderNameChange: (value: string) => void;
  onIfscCodeChange: (value: string) => void;
  onAccountNumberChange: (value: string) => void;
  onConfirmAccountNumberChange: (value: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function AccountInformationCard({
  accountHolderName,
  ifscCode,
  accountNumber,
  confirmAccountNumber,
  onAccountHolderNameChange,
  onIfscCodeChange,
  onAccountNumberChange,
  onConfirmAccountNumberChange,
}: AccountInformationCardProps) {
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
        Account Information
      </motion.h3>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        variants={containerVariants}
      >
        <motion.div className="flex flex-col gap-2" variants={itemVariants}>
          <label className="text-xs md:text-sm font-medium text-secondary">
            Account Holder Name
          </label>
          <input
            type="text"
            placeholder="As per bank records"
            value={accountHolderName}
            onChange={(e) => onAccountHolderNameChange(e.target.value)}
            className="w-full h-12 px-4 rounded-lg md:rounded-xl border border-outline text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </motion.div>

        <motion.div className="flex flex-col gap-2" variants={itemVariants}>
          <label className="text-xs md:text-sm font-medium text-secondary">
            IFSC Code
          </label>
          <input
            type="text"
            placeholder="e.g. HDFC0001234"
            value={ifscCode}
            onChange={(e) => onIfscCodeChange(e.target.value.toUpperCase())}
            className="w-full h-12 px-4 rounded-lg md:rounded-xl border border-outline text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </motion.div>

        <motion.div className="flex flex-col gap-2" variants={itemVariants}>
          <label className="text-xs md:text-sm font-medium text-secondary">
            Bank Account Number
          </label>
          <input
            type="password"
            placeholder="Enter account number"
            value={accountNumber}
            onChange={(e) => onAccountNumberChange(e.target.value)}
            className="w-full h-12 px-4 rounded-lg md:rounded-xl border border-outline text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </motion.div>

        <motion.div className="flex flex-col gap-2" variants={itemVariants}>
          <label className="text-xs md:text-sm font-medium text-secondary">
            Confirm Account Number
          </label>
          <input
            type="text"
            placeholder="Re-enter account number"
            value={confirmAccountNumber}
            onChange={(e) => onConfirmAccountNumberChange(e.target.value)}
            className="w-full h-12 px-4 rounded-lg md:rounded-xl border border-outline text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
