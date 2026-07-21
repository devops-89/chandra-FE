'use client';

import { motion } from 'framer-motion';

import type { PendingStatusProps } from './types';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function PendingStatus({
  applicationId = 'APP-2024-001',
  submittedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
}: PendingStatusProps) {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="w-full max-w-2xl">
        {/* Status Card */}
        <motion.div
          className="bg-white rounded-3xl shadow-lg border border-outline-variant/30 p-8 md:p-12 text-center space-y-6"
          variants={containerVariants}
        >
          {/* Status Icon - Pending (Clock/Hourglass) */}
          <motion.div
            className="flex justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' as any }} // eslint-disable-line @typescript-eslint/no-explicit-any
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-yellow-50 flex items-center justify-center">
              <span className="material-symbols-outlined text-5xl md:text-6xl text-yellow-600">
                schedule
              </span>
            </div>
          </motion.div>

          {/* Status Title */}
          <motion.div variants={containerVariants} className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-on-surface">
              Application Under Review
            </h1>
            <p className="text-sm md:text-base text-secondary">
              Your application has been successfully submitted and is currently being reviewed by our team.
            </p>
          </motion.div>

          {/* Status Details */}
          <motion.div
            className="bg-surface-container-low rounded-2xl p-6 md:p-8 space-y-4 text-left"
            variants={containerVariants}
          >
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant">
              <span className="text-sm md:text-base text-secondary font-medium">Application ID</span>
              <span className="text-sm md:text-base font-bold text-on-surface">{applicationId}</span>
            </div>

            <div className="flex items-center justify-between pb-4 border-b border-outline-variant">
              <span className="text-sm md:text-base text-secondary font-medium">Submitted On</span>
              <span className="text-sm md:text-base font-bold text-on-surface">{submittedDate}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm md:text-base text-secondary font-medium">Status</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500 animate-pulse" />
                <span className="text-sm md:text-base font-bold text-yellow-600">Pending</span>
              </div>
            </div>
          </motion.div>

          {/* Information Section */}
          <motion.div className="space-y-4" variants={containerVariants}>
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 md:p-6 flex gap-4">
              <span className="material-symbols-outlined text-yellow-600 text-2xl shrink-0 mt-1">
                info
              </span>
              <div className="text-left">
                <h3 className="font-semibold text-sm md:text-base text-yellow-900 mb-1">
                  What happens next?
                </h3>
                <p className="text-xs md:text-sm text-yellow-800">
                  Our team will review your application within 5-7 business days. We&apos;ll notify you via email once the review is complete. Make sure your contact information is up to date.
                </p>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 md:p-6 flex gap-4">
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
            </div>
          </motion.div>

          {/* Footer Message */}
          <motion.p className="text-xs md:text-sm text-secondary italic">
            You can close this window. We&apos;ll send you an email update at every step of the process.
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}
