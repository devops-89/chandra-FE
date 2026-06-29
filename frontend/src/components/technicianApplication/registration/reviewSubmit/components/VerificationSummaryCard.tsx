'use client';

import { motion } from 'framer-motion';

import type { VerificationSummaryCardProps } from '@/types/technicianApplication/reviewSubmit.types';

import { cardHoverVariants, itemVariants,staggerContainerVariants } from '../animations/reviewAnimations';

export default function VerificationSummaryCard({
  verificationItems,
  completedCount,
  totalCount,
  onEdit,
}: VerificationSummaryCardProps) {
  const isAllVerified = completedCount === totalCount;

  return (
    <motion.div
      className="md:col-span-5 h-full bg-surface-white rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-surface-container-low"
      variants={cardHoverVariants}
      initial="initial"
      whileHover="hover"
    >
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-2xl font-bold text-emerald-deep">Verification</h3>
        <span
          className={`px-2 py-1 rounded text-xs font-bold ${
            isAllVerified
              ? 'bg-success-mint text-emerald-deep'
              : 'bg-surface-container text-charcoal-light'
          }`}
        >
          {completedCount}/{totalCount} Verified
        </span>
      </div>

      <motion.ul
        className="space-y-4"
        variants={staggerContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {verificationItems.map((item) => (
          <motion.li
            key={item.id}
            className="flex items-center justify-between"
            variants={itemVariants}
          >
            <div className="flex items-center gap-3">
              <span
                className={`material-symbols-outlined ${
                  item.status === 'verified' ? 'text-emerald-deep' : 'text-charcoal-light'
                }`}
                style={{ fontVariationSettings: `'FILL' ${item.status === 'verified' ? 1 : 0}` }}
              >
                {item.status === 'verified' ? 'verified' : 'pending'}
              </span>
              <span className="text-base">{item.name}</span>
            </div>
            <span
              className={`text-sm font-bold ${
                item.status === 'verified' ? 'text-emerald-deep' : 'text-charcoal-light'
              }`}
            >
              {item.status === 'verified' ? 'Verified' : 'Pending'}
            </span>
          </motion.li>
        ))}
      </motion.ul>

      {onEdit && (
        <button
          type="button"
          onClick={onEdit}
          className="mt-6 text-primary font-semibold flex items-center gap-1 hover:underline cursor-pointer transition-colors text-sm"
        >
          <span className="material-symbols-outlined text-sm">edit</span>
          Edit Verification
        </button>
      )}
    </motion.div>
  );
}
