'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { AuthControllers } from '@/api/authControllers';

import ActionRequiredStatus from './ActionRequiredStatus';
import ApprovedStatus from './ApprovedStatus';
import PendingStatus from './PendingStatus';
import type { VerificationStatusContainerProps } from './types';

export default function VerificationStatusContainer({
  status: initialStatus = 'pending',
}: VerificationStatusContainerProps) {
  const [currentStatus, setCurrentStatus] = useState<'pending' | 'approved' | 'action_required'>(initialStatus);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const fetchStatus = async () => {
      try {
        const response = await AuthControllers.getProfile();
        if (active && response.data) {
          const userData = ('user' in response.data) ? (response.data as any).user : response.data;
          const apiStatus = userData?.technicianProfile?.status;

          if (apiStatus === 'APPROVED') {
            setCurrentStatus('approved');
          } else if (apiStatus === 'ACTION_REQUIRED' || apiStatus === 'REJECTED') {
            setCurrentStatus('action_required');
          } else {
            setCurrentStatus('pending');
          }
        }
      } catch (err) {
        console.error('Failed to fetch profile in container:', err);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchStatus();

    return () => {
      active = false;
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {currentStatus === 'pending' && <PendingStatus />}
      {currentStatus === 'approved' && <ApprovedStatus onGoDashboard={() => {}} />}
      {currentStatus === 'action_required' && <ActionRequiredStatus onEditApplication={() => {}} />}
    </motion.div>
  );
}
