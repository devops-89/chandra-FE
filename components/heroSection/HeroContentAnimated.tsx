'use client';

import { motion } from 'framer-motion';

import type { HeroContentAnimatedProps } from '@/types/hero.types';

const HeroContentAnimated = ({
  label,
  heading,
  headingHighlight,
  description,
  cta,
}: HeroContentAnimatedProps) => {
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
      className="relative z-10 mx-auto max-w-2xl text-center lg:mx-0 lg:text-left xl:max-w-3xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Premium Badge */}
      <motion.p
      animate={{
        translateY: [0, -4, 0],
      }}
      transition={{
        duration: 3.5,
        repeat: Infinity,
        ease: 'easeInOut' as any,
      }}
      style={{
        willChange: 'transform',
      }}
       className="mb-8 inline-flex max-w-full rounded-full border border-emerald-300/50 bg-linear-to-r from-emerald-50 to-emerald-100/50 px-3 py-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-emerald-700 shadow-sm backdrop-blur sm:mb-5 sm:px-4 sm:text-xs">
        {label}
      </motion.p>

      {/* Premium Heading */}
      <motion.h1 variants={itemVariants} className="text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-950 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
        {heading}{' '}
        <span className="bg-linear-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">{headingHighlight}</span>
      </motion.h1>

      {/* Premium Description */}
      <motion.p variants={itemVariants} className="mx-auto mt-6 max-w-xl text-base leading-8 text-slate-700 sm:mt-7 md:max-w-2xl lg:mx-0 xl:max-w-4xl">
        {description}
      </motion.p>

      {/* CTA Section */}
      <motion.div variants={itemVariants} className="mt-8 flex flex-col items-center gap-6 sm:mt-10 sm:flex-row sm:justify-center sm:gap-10 lg:justify-start xl:gap-12">
        <button
          type="button"
          onClick={() => {
          document
          .getElementById('services')
          ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          });
      }}
      className="group inline-flex h-12 w-full items-center justify-center rounded-full bg-linear-to-br from-emerald-600 cursor-pointer to-emerald-700 px-7 text-base font-bold text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-600/30 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 sm:h-13 sm:w-auto sm:px-8"
      >
      {cta.label}
      </button>
      </motion.div>
    </motion.div>
  );
};

export default HeroContentAnimated;
