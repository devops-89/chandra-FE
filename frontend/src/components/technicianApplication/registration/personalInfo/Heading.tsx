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

export default function Heading() {
  return (
    <motion.div className="mb-6 md:mb-8" initial="hidden" animate="visible" variants={itemVariants}>
      <h1 className="text-3xl md:text-5xl font-bold">
        Create your professional account
      </h1>

      <p className="text-gray-500 mt-2 md:mt-4 text-sm md:text-base">
        Provide your basic information to start
        your journey with HiChandra.
      </p>
    </motion.div>
  );
}