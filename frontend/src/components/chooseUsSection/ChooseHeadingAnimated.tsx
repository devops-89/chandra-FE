'use client';

import { motion } from 'framer-motion';

interface ChooseHeadingAnimatedProps {
  paragraph?: string;
  heading: string;
}

export function ChooseHeadingAnimated({ paragraph, heading }: ChooseHeadingAnimatedProps) {
  // Stagger container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.10,
        delayChildren: 0,
      },
    },
  };

  // Item variants for staggered animation
  const itemVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: {
      opacity: 1,
      y: -20,
      transition: {
        duration: 1,
        type: 'spring' as const,
        bounce: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="mb-12 text-center"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {paragraph && (
        <motion.p variants={itemVariants} className="text-lg text-black">
          {paragraph}
        </motion.p>
      )}

      <motion.h2 variants={itemVariants} className="mt-3 text-4xl text-background font-bold md:text-5xl">
        {heading}
      </motion.h2>
    </motion.div>
  );
}
