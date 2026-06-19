'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import type { HeroImageAnimatedProps } from '@/types/hero.types';

const HeroImageAnimated = ({ image }: HeroImageAnimatedProps) => {
  // Container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0,
      },
    },
  };

  // Image container variants - slide from right to left
  const imageVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        type: 'spring' as const,
        bounce: 0.3,
      },
    },
  };

  // Info card variants - slide from right to left with slight delay
  const cardVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        type: 'spring' as const,
        bounce: 0.3,
      },
    },
  };

  return (
    <motion.div
      className="relative z-10 hidden lg:block"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Premium Image Container */}
      <motion.div variants={imageVariants} className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/40 p-2 shadow-2xl shadow-slate-900/15 backdrop-blur-md sm:p-3 lg:rounded-4xl">
        <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-emerald-50/80 sm:aspect-5/4 sm:rounded-3xl lg:aspect-4/3">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </motion.div>

      {/* Premium Info Card */}
      <motion.div variants={cardVariants}
      animate={{
        y: [0, -6, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
      style={{
        willChange: 'transform',
      }}
      className="absolute -bottom-6 left-4 hidden rounded-2xl border border-white/70 bg-white/95 px-4 py-3 shadow-lg shadow-slate-900/15 backdrop-blur-md sm:block sm:left-6 sm:px-5 sm:py-4 lg:left-8">
        <p className="text-sm font-bold text-slate-950">Same-day slots</p>
        <p className="mt-1 text-xs font-medium text-slate-600">Available in selected areas</p>
      </motion.div>
    </motion.div>
  );
};

export default HeroImageAnimated;
