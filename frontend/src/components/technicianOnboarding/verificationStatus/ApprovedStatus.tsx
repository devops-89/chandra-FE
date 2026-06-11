'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import StatusActionButtons from './common/StatusActionButtons';
import StatusBadge from './common/StatusBadge';
import StatusCard from './common/StatusCard';
import StatusIcon from './common/StatusIcon';
import type { ApprovedStatusProps } from './types';

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

export default function ApprovedStatus({
  approvalDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
  profileCompleteness = 100,
  onGoDashboard,
  onViewProfile,
}: ApprovedStatusProps) {
  const router = useRouter();

  const handleGoDashboard = () => {
    onGoDashboard?.();
    router.push('/dashboard/technician');
  };

  const handleViewProfile = () => {
    onViewProfile?.();
    router.push('/dashboard/technician/profile');
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
            {/* Icon with Glow Effect */}
            <motion.div
              className="flex justify-center relative"
              variants={itemVariants}
            >
              <motion.div
                className="absolute w-32 h-32 bg-green-500/20 rounded-full blur-2xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="relative">
                <StatusIcon status="approved" size="md" />
              </div>
            </motion.div>

            {/* Status Badge */}
            <motion.div className="flex justify-center" variants={itemVariants}>
              <StatusBadge status="approved" />
            </motion.div>

            {/* Title & Description */}
            <motion.div className="space-y-3 text-center" variants={itemVariants}>
              <h1 className="text-3xl md:text-4xl font-bold text-on-surface">
                Congratulations!
              </h1>
              <p className="text-sm md:text-base text-secondary">
                Your application has been approved. You can now access the technician dashboard and start accepting work.
              </p>
            </motion.div>

            {/* Success Details */}
            <motion.div
              className="bg-green-50 border border-green-200 rounded-2xl p-6 md:p-8 space-y-4"
              variants={itemVariants}
            >
              <div className="flex items-center gap-3 pb-4 border-b border-green-200">
                <span className="material-symbols-outlined text-green-600 text-2xl shrink-0">
                  verified
                </span>
                <div className="text-left">
                  <h3 className="font-semibold text-sm md:text-base text-green-900">
                    Approval Confirmed
                  </h3>
                  <p className="text-xs md:text-sm text-green-700">{approvalDate}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-green-600 text-lg">
                    check
                  </span>
                  <span className="text-sm md:text-base text-green-900">
                    Documents verified
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-green-600 text-lg">
                    check
                  </span>
                  <span className="text-sm md:text-base text-green-900">
                    Background check completed
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-green-600 text-lg">
                    check
                  </span>
                  <span className="text-sm md:text-base text-green-900">
                    Profile {profileCompleteness}% complete
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Information */}
            <motion.div
              className="bg-surface-container-low rounded-2xl p-4 md:p-6 flex gap-4"
              variants={itemVariants}
            >
              <span className="material-symbols-outlined text-primary text-2xl shrink-0 mt-1">
                info
              </span>
              <div className="text-left">
                <h3 className="font-semibold text-sm md:text-base text-on-surface mb-1">
                  What's Next?
                </h3>
                <p className="text-xs md:text-sm text-secondary">
                  Head to your dashboard to complete your profile, set availability, and start receiving service requests from customers.
                </p>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={itemVariants}>
              <StatusActionButtons
                primaryAction={{
                  label: 'Go To Technician Dashboard',
                  onClick: handleGoDashboard,
                }}
                secondaryAction={{
                  label: 'View Profile',
                  onClick: handleViewProfile,
                }}
              />
            </motion.div>
          </motion.div>
        </StatusCard>
      </div>
    </motion.div>
  );
}
