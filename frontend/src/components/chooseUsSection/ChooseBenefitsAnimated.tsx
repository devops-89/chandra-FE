'use client';

import { motion } from 'framer-motion';
import { ChooseBenefits } from './ChooseBenefits';

export function ChooseBenefitsAnimated() {
  const itemVariants = {
    hidden: { opacity: 0, x: 0 },
    visible: {
      opacity: 1,
      x: -20,
      transition: {
        duration: 1,
        type: 'spring' as const,
        bounce: 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <ChooseBenefits />
    </motion.div>
  );
}
