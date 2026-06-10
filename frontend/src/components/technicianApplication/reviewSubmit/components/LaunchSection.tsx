'use client';

import { motion } from 'framer-motion';

import type { LaunchSectionProps } from '@/types/technicianApplication/reviewSubmit.types';

import { launchSectionVariants } from '../animations/reviewAnimations';
import SubmitApprovalButton from './SubmitApprovalButton';

export default function LaunchSection({
  onSubmit,
  isLoading = false,
}: LaunchSectionProps) {
  return (
    <motion.div
      className="mt-32 mb-16 p-10 bg-emerald-deep rounded-4xl text-white flex flex-col items-center text-center shadow-2xl relative overflow-hidden"
      variants={launchSectionVariants}
      initial="initial"
      animate="visible"
    >
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-container/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        <motion.span
          className="material-symbols-outlined text-6xl mb-6 text-primary-fixed block"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          task_alt
        </motion.span>

        <motion.h2
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          All Set to Launch?
        </motion.h2>

        <motion.p
          className="text-lg text-primary-fixed max-w-xl mb-10 opacity-90"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          By submitting, you agree to our Technician Terms of Service and Code of Conduct.
          Our team will review your credentials and get back to you within 48 hours.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <SubmitApprovalButton
            onClick={onSubmit}
            isLoading={isLoading}
          />
        </motion.div>

        <motion.p
          className="mt-6 text-xs font-semibold text-primary-fixed/70 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Final Step: Approval will enable your dashboard visibility for customers.
        </motion.p>
      </div>
    </motion.div>
  );
}
