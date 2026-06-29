'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import type { VerificationSummaryCardProps } from '@/types/technicianApplication/reviewSubmit.types';

import { cardHoverVariants, itemVariants, staggerContainerVariants } from '../animations/reviewAnimations';

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
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-2xl font-bold text-emerald-deep">Documents</h3>
        <span
          className={`px-2 py-1 rounded text-xs font-bold ${
            isAllVerified
              ? 'bg-success-mint text-emerald-deep'
              : 'bg-surface-container text-charcoal-light'
          }`}
        >
          {completedCount}/{totalCount} Uploaded
        </span>
      </div>

      <motion.ul
        className="space-y-3"
        variants={staggerContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {verificationItems.map((item) => (
          <motion.li
            key={item.id}
            className="flex items-center justify-between gap-2"
            variants={itemVariants}
          >
            {/* Left: status icon + name */}
            <div className="flex items-center gap-3 min-w-0">
              <span
                className={`material-symbols-outlined shrink-0 ${
                  item.status === 'verified' ? 'text-emerald-deep' : 'text-charcoal-light'
                }`}
                style={{ fontVariationSettings: `'FILL' ${item.status === 'verified' ? 1 : 0}` }}
              >
                {item.status === 'verified' ? 'check_circle' : 'pending'}
              </span>
              <span className="text-base truncate">{item.name}</span>
            </div>

            {/* Right: selfie thumbnail OR view link OR "Pending" label */}
            {item.previewUrl ? (
              item.id === 'selfie' ? (
                // Selfie: small round thumbnail that opens full view on click
                <a
                  href={item.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View selfie"
                  className="shrink-0 w-9 h-9 rounded-full overflow-hidden border-2 border-primary-fixed block hover:opacity-80 transition-opacity"
                >
                  <Image
                    src={item.previewUrl}
                    alt="Selfie"
                    width={36}
                    height={36}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </a>
              ) : (
                // Other documents: "View" link with open_in_new icon
                <a
                  href={item.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center gap-1 text-xs font-semibold text-primary hover:underline transition-colors"
                  title={`View ${item.name}`}
                >
                  <span className="material-symbols-outlined text-base">open_in_new</span>
                  View
                </a>
              )
            ) : (
              <span className="shrink-0 text-sm font-bold text-charcoal-light">Pending</span>
            )}
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
          Re-Upload Documents
        </button>
      )}
    </motion.div>
  );
}
