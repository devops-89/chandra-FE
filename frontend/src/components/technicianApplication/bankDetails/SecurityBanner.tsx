'use client';

import { motion } from 'framer-motion';

import { SECURITY_BANNER_MESSAGE } from '@/data/technicianApplication/bankDetailsData';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function SecurityBanner() {
  return (
    <motion.div
      className="bg-success-mint/30 border border-success-mint rounded-2xl md:rounded-3xl p-4 md:p-6 flex items-start gap-4"
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <span className="material-symbols-outlined text-emerald-deep text-2xl shrink-0 mt-1">
        lock
      </span>
      <p className="text-sm md:text-base text-emerald-deep leading-relaxed">
        {SECURITY_BANNER_MESSAGE}
      </p>
    </motion.div>
  );
}
