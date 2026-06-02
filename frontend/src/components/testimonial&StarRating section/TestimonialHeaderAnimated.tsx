'use client';

import { motion } from 'framer-motion';

interface TestimonialHeaderAnimatedProps {
  heading: string;
  highlightedText: string;
  description: string;
}

export function TestimonialHeaderAnimated({
  heading,
  highlightedText,
  description,
}: TestimonialHeaderAnimatedProps) {
  // Stagger container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0,
      },
    },
  };

  // Item variants for left to right animation
  const itemVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        type: 'spring' as const,
        bounce: 0.3,
      },
    },
  };

  return (
    <motion.div
      className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <div>
        <motion.h2 variants={itemVariants} className="text-4xl font-bold tracking-[-0.04em] text-slate-950 md:text-5xl">
          {heading}{' '}
          <span className="text-emerald-600">
            {highlightedText}
          </span>
        </motion.h2>

        <motion.p variants={itemVariants} className="mt-4 text-lg text-slate-950">
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
}
