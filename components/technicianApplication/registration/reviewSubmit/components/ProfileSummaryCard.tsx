'use client';

import { motion } from 'framer-motion';

import type { BankDetailsSummaryCardProps } from '@/types/technicianApplication/reviewSubmit.types';

import { cardHoverVariants } from '../animations/reviewAnimations';

/** Masks all but the last 4 digits of an account number. */
function maskAccountNumber(num: string): string {
  if (num.length <= 4) return num;
  return '•'.repeat(num.length - 4) + num.slice(-4);
}

export default function BankDetailsSummaryCard({
  bankDetails,
  onEdit,
}: BankDetailsSummaryCardProps) {
  if (!bankDetails) return null;

  const { payoutMethod } = bankDetails;
  const hasData =
    payoutMethod === 'upi'
      ? !!bankDetails.upiId
      : !!(bankDetails.accountHolderName || bankDetails.accountNumber || bankDetails.ifscCode);

  return (
    <motion.div
      className="md:col-span-7 h-full bg-surface-white rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-surface-container-low"
      variants={cardHoverVariants}
      initial="initial"
      whileHover="hover"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-2xl font-bold text-emerald-deep">Bank Details</h3>
        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="text-primary font-semibold flex items-center gap-1 hover:underline cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-sm">edit</span>
            Edit
          </button>
        )}
      </div>

      {hasData ? (
        <div className="space-y-5">
          {/* Payout Method Badge */}
          <div>
            <p className="text-xs font-semibold text-charcoal-light uppercase tracking-wider mb-2">
              Payout Method
            </p>
            <span className="inline-flex items-center gap-1.5 bg-tertiary-fixed text-emerald-deep px-3 py-1 rounded-full text-sm font-semibold border border-outline-variant">
              <span className="material-symbols-outlined text-sm">
                {payoutMethod === 'upi' ? 'smartphone' : 'account_balance'}
              </span>
              {payoutMethod === 'upi' ? 'UPI' : 'Bank Transfer'}
            </span>
          </div>

          {/* UPI ID */}
          {payoutMethod === 'upi' && bankDetails.upiId && (
            <div>
              <p className="text-xs font-semibold text-charcoal-light uppercase tracking-wider mb-1">
                UPI ID
              </p>
              <p className="text-base font-mono font-medium text-on-surface">{bankDetails.upiId}</p>
            </div>
          )}

          {/* Bank Transfer fields */}
          {payoutMethod === 'bank-transfer' && (
            <>
              {bankDetails.accountHolderName && (
                <div>
                  <p className="text-xs font-semibold text-charcoal-light uppercase tracking-wider mb-1">
                    Account Holder
                  </p>
                  <p className="text-base font-semibold text-on-surface">{bankDetails.accountHolderName}</p>
                </div>
              )}

              {bankDetails.accountNumber && (
                <div>
                  <p className="text-xs font-semibold text-charcoal-light uppercase tracking-wider mb-1">
                    Account Number
                  </p>
                  <p className="text-base font-mono font-medium text-on-surface tracking-widest">
                    {maskAccountNumber(bankDetails.accountNumber)}
                  </p>
                </div>
              )}

              {bankDetails.ifscCode && (
                <div>
                  <p className="text-xs font-semibold text-charcoal-light uppercase tracking-wider mb-1">
                    IFSC Code
                  </p>
                  <p className="text-base font-mono font-medium text-on-surface uppercase">{bankDetails.ifscCode}</p>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-charcoal-light gap-2">
          <span className="material-symbols-outlined text-4xl">account_balance</span>
          <p className="text-sm">No bank details saved yet.</p>
        </div>
      )}
    </motion.div>
  );
}
