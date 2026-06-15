'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React from 'react';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function BankDetailsFooter() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const handlePreviousStep = () => {
    router.push('/technicianOnboarding/service-area');
  };

  const handleSaveContinue = () => {
    setIsLoading(true);
    // Simulate save
    setTimeout(() => {
      setIsLoading(false);
      router.push('/technicianOnboarding/review-submit');
    }, 500);
  };

  return (
    <motion.div
      className="flex justify-between items-center gap-4 mt-8 md:mt-12"
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.button
        type="button"
        onClick={handlePreviousStep}
        className="flex items-center gap-2 text-secondary hover:text-primary px-4 md:px-6 py-2 transition-all group font-medium text-sm md:text-base"
        whileHover={{ x: -4 }}
        whileTap={{ scale: 0.98 }}
      >
        <span
          className="material-symbols-outlined transition-transform group-hover:-translate-x-1"
          style={{ fontSize: '20px' }}
        >
          arrow_back
        </span>
        <span className="hidden md:inline">Previous Step</span>
      </motion.button>

      <motion.button
        type="button"
        onClick={handleSaveContinue}
        disabled={isLoading}
        className="bg-primary hover:bg-emerald-deep disabled:opacity-50 disabled:cursor-not-allowed text-on-primary cursor-pointer rounded-lg md:rounded-xl px-6 md:px-8 py-3 font-medium flex items-center gap-2 transition-all shadow-md hover:shadow-lg text-sm md:text-base"
        whileHover={!isLoading ? { y: -2 } : {}}
        whileTap={!isLoading ? { scale: 0.98 } : {}}
      >
        <span>{isLoading ? 'Saving...' : 'Save & Continue'}</span>
        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
          arrow_forward
        </span>
      </motion.button>
    </motion.div>
  );
}
