'use client';

import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function BankDetailsHeader() {
  return (
    <motion.header className="space-y-2" variants={itemVariants}>
      <h1 className="text-3xl md:text-4xl font-bold text-on-surface">
        Add Bank Account For Payouts
      </h1>
      <p className="text-sm md:text-base text-secondary">
        Ensure your bank details are accurate to receive weekly payouts without delays.
      </p>
    </motion.header>
  );
}
