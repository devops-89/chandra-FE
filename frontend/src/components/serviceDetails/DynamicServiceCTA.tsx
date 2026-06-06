'use client';

import { motion } from 'framer-motion';

import type { Service } from '@/types/services.types';

interface DynamicServiceCTAProps {
  service: Service;
  onBookingClick: () => void;
}

export default function DynamicServiceCTA({
  service,
  onBookingClick,
}: DynamicServiceCTAProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        type: 'spring' as const,
        bounce: 0.28,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        type: 'spring' as const,
        bounce: 0.3,
      },
    },
  };

  return (
    <section className="py-24 bg-white">
      <motion.div
        className="
          mx-auto
          max-w-4xl
          rounded-[40px]
          bg-emerald-600
          px-8
          py-16
          text-center
          text-white
        "
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
      >
        <motion.h2
          variants={itemVariants}
          className="
            text-3xl
            font-bold
            md:text-5xl
          "
        >
          {service.ctaTitle}
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="
            mt-4
            text-lg
            text-emerald-50
          "
        >
          {service.ctaDescription}
        </motion.p>

        <motion.div variants={itemVariants}>
          <button
            onClick={onBookingClick}
            className="
              mt-8
              inline-flex
              rounded-full
              bg-white
              px-8
              py-4
              text-lg
              font-semibold
              text-emerald-700
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-lg
              active:scale-95
            "
          >
            Book {service.title}
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}