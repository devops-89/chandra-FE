'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import StatusActionButtons from './common/StatusActionButtons';
import StatusBadge from './common/StatusBadge';
import StatusCard from './common/StatusCard';
import StatusIcon from './common/StatusIcon';
import type { ActionRequiredStatusProps } from './types';

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
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
} as const;

export default function ActionRequiredStatus({
  rejectionReasons = [
    'Missing valid government ID document',
    'Service area does not meet minimum requirements',
    'Tools and equipment inventory incomplete',
  ],
  onEditApplication,
  onResubmit,
}: ActionRequiredStatusProps) {
  const router = useRouter();

  const handleEditApplication = () => {
    onEditApplication?.();
    router.push('/technician/onboarding/register');
  };

  const handleResubmit = () => {
    onResubmit?.();
    router.push('/technician/onboarding/pending-verification');
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="w-full max-w-2xl">
        <StatusCard>
          <motion.div className="space-y-8" variants={containerVariants}>
            {/* Icon with Warning Entrance */}
            <motion.div
              className="flex justify-center"
              variants={itemVariants}
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <StatusIcon status="action_required" size="md" />
              </motion.div>
            </motion.div>

            {/* Status Badge */}
            <motion.div className="flex justify-center" variants={itemVariants}>
              <StatusBadge status="action_required" />
            </motion.div>

            {/* Title & Description */}
            <motion.div className="space-y-3 text-center" variants={itemVariants}>
              <h1 className="text-3xl md:text-4xl font-bold text-on-surface">
                Action Required
              </h1>
              <p className="text-sm md:text-base text-secondary">
                Your application needs some updates before we can proceed. Please review the items below and resubmit.
              </p>
            </motion.div>

            {/* Rejection Reasons */}
            <motion.div className="space-y-3" variants={containerVariants}>
              <h2 className="font-semibold text-sm md:text-base text-on-surface mb-4">
                Issues Found:
              </h2>
              {rejectionReasons.map((reason, index) => (
                <motion.div
                  key={index}
                  className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3"
                  variants={itemVariants}
                >
                  <span className="material-symbols-outlined text-red-600 text-2xl shrink-0 mt-1">
                    error
                  </span>
                  <p className="text-sm md:text-base text-red-900">{reason}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* What To Do Next */}
            <motion.div
              className="bg-surface-container-low rounded-2xl p-4 md:p-6 flex gap-4"
              variants={itemVariants}
            >
              <span className="material-symbols-outlined text-primary text-2xl shrink-0 mt-1">
                info
              </span>
              <div className="text-left">
                <h3 className="font-semibold text-sm md:text-base text-on-surface mb-2">
                  What To Do Next:
                </h3>
                <ol className="space-y-2 text-xs md:text-sm text-secondary">
                  <li className="flex gap-2">
                    <span className="font-bold shrink-0">1.</span>
                    <span>Review the issues listed above</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold shrink-0">2.</span>
                    <span>Click &ldquo;Edit Application&rdquo; to make corrections</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold shrink-0">3.</span>
                    <span>Update the required information and upload correct documents</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold shrink-0">4.</span>
                    <span>Resubmit your application for review</span>
                  </li>
                </ol>
              </div>
            </motion.div>

            {/* Support Information */}
            <motion.div
              className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 md:p-6 flex gap-4"
              variants={itemVariants}
            >
              <span className="material-symbols-outlined text-yellow-600 text-2xl shrink-0 mt-1">
                support_agent
              </span>
              <div className="text-left">
                <h3 className="font-semibold text-sm md:text-base text-yellow-900 mb-1">
                  Need Help?
                </h3>
                <p className="text-xs md:text-sm text-yellow-800 mb-2">
                  Contact our support team if you have questions about these requirements.
                </p>
                <a
                  href="mailto:support@hichandra.com"
                  className="text-xs md:text-sm font-semibold text-yellow-700 hover:text-yellow-800 underline"
                >
                  support@hichandra.com
                </a>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={itemVariants}>
              <StatusActionButtons
                primaryAction={{
                  label: 'Edit Application',
                  onClick: handleEditApplication,
                }}
                secondaryAction={{
                  label: 'Resubmit For Review',
                  onClick: handleResubmit,
                }}
              />
            </motion.div>

            {/* Footer Message */}
            <motion.p className="text-xs md:text-sm text-secondary italic text-center" variants={itemVariants}>
              You can save your changes as drafts and come back anytime to complete your application.
            </motion.p>
          </motion.div>
        </StatusCard>
      </div>
    </motion.div>
  );
}
