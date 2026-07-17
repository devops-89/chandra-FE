'use client';

import { motion } from 'framer-motion';

import ActionRequiredStatus from './ActionRequiredStatus';
import ApprovedStatus from './ApprovedStatus';
import PendingStatus from './PendingStatus';
import type { VerificationStatusContainerProps } from './types';

export default function VerificationStatusContainer({
  status = 'pending',
}: VerificationStatusContainerProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {status === 'pending' && <PendingStatus />}
      {status === 'approved' && <ApprovedStatus onGoDashboard={() => {}} />}
      {status === 'action_required' && <ActionRequiredStatus onEditApplication={() => {}} />}
    </motion.div>
  );
}
