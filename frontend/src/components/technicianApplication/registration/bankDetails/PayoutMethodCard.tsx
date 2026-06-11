'use client';

import { motion } from 'framer-motion';

import { PAYOUT_METHOD_OPTIONS } from '@/data/technicianApplication/bankDetailsData';

interface PayoutMethodCardProps {
  selectedMethod: 'bank-transfer' | 'upi';
  onMethodChange: (method: 'bank-transfer' | 'upi') => void;
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

export default function PayoutMethodCard({
  selectedMethod,
  onMethodChange,
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

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        variants={containerVariants}
      >
        {PAYOUT_METHOD_OPTIONS.map((option) => (
          <motion.label
            key={option.id}
            className={`
              relative flex items-center p-4 rounded-xl border-2 cursor-pointer
              transition-all duration-300
              ${
                selectedMethod === option.id
                  ? 'border-primary bg-primary/5'
                  : 'border-outline-variant hover:border-outline'
              }
            `}
            variants={itemVariants}
            whileHover={{ y: -2 }}
          >
            <input
            title='button'
              type="radio"
              name="payout-method"
              value={option.id}
              checked={selectedMethod === option.id}
              onChange={() => onMethodChange(option.id as 'bank-transfer' | 'upi')}
              className="hidden"
            />

            {selectedMethod === option.id ? (
              <span
                className="material-symbols-outlined text-primary mr-3 text-xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            ) : (
              <div className="w-6 h-6 rounded-full border-2 border-outline-variant mr-3" />
            )}

            <div className="flex flex-col">
              <span className="text-xs md:text-sm font-medium text-on-surface">
                {option.label}
              </span>
              <span className="text-xs text-secondary">{option.description}</span>
            </div>
          </motion.label>
        ))}
      </motion.div>
    </motion.section>
  );
}
