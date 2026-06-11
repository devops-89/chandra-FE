'use client';

import { motion } from 'framer-motion';

import { AUTO_DETECTED_BANK_INFO } from '@/data/technicianApplication/bankDetailsData';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function AutoDetectedBankInfo() {
  return (
    <motion.section
      className="bg-surface-container-low rounded-2xl md:rounded-3xl p-6 md:p-8 border-2 border-dashed border-outline-variant"
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="material-symbols-outlined text-secondary text-xl">info</span>
        <h3 className="text-xs md:text-sm font-medium text-secondary">
          Auto-detected Bank Details
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-60">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-secondary">Bank Name</span>
          <span className="text-sm md:text-base font-semibold text-on-surface">
            {AUTO_DETECTED_BANK_INFO.bankName}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-secondary">Branch Name</span>
          <span className="text-sm md:text-base font-semibold text-on-surface">
            {AUTO_DETECTED_BANK_INFO.branchName}
          </span>
        </div>
      </div>
    </motion.section>
  );
}
