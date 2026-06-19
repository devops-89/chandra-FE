'use client';

import { motion } from 'framer-motion';

import { useBookingAuth } from '@/hooks';
import type { Service } from '@/types/services.types';

interface DynamicServiceCTAProps {
  service: Service;
  onBookingClick: () => void;
}

export default function DynamicServiceCTA({
  service,
  onBookingClick,
}: DynamicServiceCTAProps) {
  const { isAuthenticated, handleBookingClick } = useBookingAuth();
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
            type="button"
            onClick={() => handleBookingClick(onBookingClick)}
            className="
              mt-8
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-white
              px-8
              py-4
              text-lg
              cursor-pointer
              font-semibold
              text-emerald-700
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-lg
              active:scale-95
            "
          >
            {isAuthenticated ? (
              <>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Book {service.title}
              </>
            ) : (
              <>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Sign In to Book {service.title}
              </>
            )}
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}