'use client';

import { motion } from 'framer-motion';

import type { StatusCardProps } from '../types';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function StatusCard({
  children,
  className = '',
}: StatusCardProps) {
  return (
    <motion.div
      className={`bg-white rounded-3xl shadow-lg border border-outline-variant/30 p-8 md:p-12 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
}
