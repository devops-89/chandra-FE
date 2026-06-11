'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import StatusActionButtons from './common/StatusActionButtons';
import StatusBadge from './common/StatusBadge';
import StatusCard from './common/StatusCard';
import StatusIcon from './common/StatusIcon';
import type { PendingStatusProps } from './types';

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

export default function PendingStatus({
  applicationId = 'APP-2024-001',
  submittedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
  onRefresh,
  onBackToHome,
}: PendingStatusProps) {
  const router = useRouter();

  const handleRefresh = () => {
    onRefresh?.();
    window.location.reload();
  };

  const handleBackToHome = () => {
    onBackToHome?.();
    router.push('/');
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
            {/* Icon */}
            <motion.div className="flex justify-center" variants={itemVariants}>
              <StatusIcon status="pending" size="md" />
            </motion.div>

            {/* Status Badge */}
            <motion.div className="flex justify-center" variants={itemVariants}>
              <StatusBadge status="pending" />
            </motion.div>

            {/* Title & Description */}
            <motion.div className="space-y-3 text-center" variants={itemVariants}>
              <h1 className="text-3xl md:text-4xl font-bold text-on-surface">
                Application Under Review
              </h1>
              <p className="text-sm md:text-base text-secondary">
                Your application has been successfully submitted and is currently being reviewed by our team.
              </p>
            </motion.div>

            {/* Status Details */}
            <motion.div
              className="bg-surface-container-low rounded-2xl p-6 md:p-8 space-y-4"
              variants={itemVariants}
            >
              <div className="flex items-center justify-between pb-4 border-b border-outline-variant">
                <span className="text-sm md:text-base text-secondary font-medium">
                  Application ID
                </span>
                <span className="text-sm md:text-base font-bold text-on-surface">
                  {applicationId}
                </span>
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-outline-variant">
                <span className="text-sm md:text-base text-secondary font-medium">
                  Submitted On
                </span>
                <span className="text-sm md:text-base font-bold text-on-surface">
                  {submittedDate}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm md:text-base text-secondary font-medium">
                  Expected Response
                </span>
                <span className="text-sm md:text-base font-bold text-yellow-600">
                  24–48 Hours
                </span>
              </div>
            </motion.div>

            {/* Information Cards */}
            <motion.div className="space-y-4" variants={containerVariants}>
              <motion.div
                className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 md:p-6 flex gap-4"
                variants={itemVariants}
              >
                <span className="material-symbols-outlined text-yellow-600 text-2xl shrink-0 mt-1">
                  info
                </span>
                <div className="text-left">
                  <h3 className="font-semibold text-sm md:text-base text-yellow-900 mb-1">
                    What happens next?
                  </h3>
                  <p className="text-xs md:text-sm text-yellow-800">
                    Our team will review your application within 24–48 hours. We'll notify you via email once the review is complete. Make sure your contact information is up to date.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="bg-primary/5 border border-primary/20 rounded-2xl p-4 md:p-6 flex gap-4"
                variants={itemVariants}
              >
                <span className="material-symbols-outlined text-primary text-2xl shrink-0 mt-1">
                  check_circle
                </span>
                <div className="text-left">
                  <h3 className="font-semibold text-sm md:text-base text-primary mb-1">
                    Application Received
                  </h3>
                  <p className="text-xs md:text-sm text-secondary">
                    All your documents have been received and are secure with us.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={itemVariants}>
              <StatusActionButtons
                primaryAction={{
                  label: 'Refresh Status',
                  onClick: handleRefresh,
                }}
                secondaryAction={{
                  label: 'Back to Home',
                  onClick: handleBackToHome,
                }}
              />
            </motion.div>

            {/* Footer Message */}
            <motion.p className="text-xs md:text-sm text-secondary italic text-center" variants={itemVariants}>
              You can close this window. We'll send you an email update at every step of the process.
            </motion.p>
          </motion.div>
        </StatusCard>
      </div>
    </motion.div>
  );
}
