'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import { useBookingAuth } from '@/hooks';
import type { Service } from '@/types/services.types';

interface DynamicServiceHeroProps {
  service: Service;
  onBookingClick: () => void;
}

export default function DynamicServiceHero({
  service,
  onBookingClick,
}: DynamicServiceHeroProps) {
  const { isAuthenticated, handleBookingClick } = useBookingAuth();
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

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.5,
        type: 'spring' as const,
        bounce: 0.35,
      },
    },
  };

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

  return (
    <section className="relative bg-slate-50 rounded-2xl shadow-lg py-20 p-4">
      
      <motion.div
        className="
          relative
          z-10
          mx-auto
          flex
          max-w-7xl
          flex-col
          items-center
          gap-12
          px-4
          md:flex-row
        "
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="flex-1" variants={containerVariants}>
          <motion.span
            variants={contentVariants}
            className="
              inline-flex
              rounded-full
              border
              border-emerald-200
              bg-emerald-50
              px-5
              py-2
              text-sm
              font-semibold
              uppercase
              tracking-wider
              text-emerald-700
            "
          >
            {service.badge}
          </motion.span>

          <motion.h1
            variants={contentVariants}
            className="
              mt-2
              text-4xl
              font-bold
              leading-tight
              text-slate-900
              md:text-6xl
            "
          >
            {service.title}
          </motion.h1>

          <motion.p
            variants={contentVariants}
            className="
              max-w-2xl
              text-md
              leading-8
              text-slate-600
            "
          >
            {service.description}
          </motion.p>

          <motion.div className="mt-8" variants={contentVariants}>
            <span className="text-slate-500">
              Starting From
            </span>

            <p
              className="
                text-4xl
                font-bold
                text-emerald-600
              "
            >
              ₹{service.price}
            </p>
          </motion.div>

          <motion.div className="mt-8" variants={contentVariants}>
            <button
              type="button"
              onClick={() => handleBookingClick(onBookingClick)}
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-emerald-600
                px-8
                py-4
                text-lg
                font-semibold
                text-white
                transition-all
                duration-300
                cursor-pointer
                hover:bg-emerald-700
                hover:shadow-lg
                hover:-translate-y-1
                active:scale-95
              "
            >
              {isAuthenticated ? (
                <>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Book Now
                </>
              ) : (
                <>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Sign In to Book
                </>
              )}
            </button>
          </motion.div>
        </motion.div>

        <motion.div className="flex-1" variants={imageVariants}>
          <Image
            src={service.image}
            alt={service.title}
            width={700}
            height={500}
            unoptimized={service.image.startsWith('http://') || service.image.startsWith('https://')}
            className="
              w-full
              rounded-4xl
              object-cover
              shadow-xl
              bg-white
            "
          />
        </motion.div>
      </motion.div>
    </section>
  );
}