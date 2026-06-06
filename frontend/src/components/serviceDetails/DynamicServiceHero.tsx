'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import HeroDecorations from '@/components/heroSection/HeroDecorations';
import type { Service } from '@/types/services.types';

interface DynamicServiceHeroProps {
  service: Service;
  onBookingClick: () => void;
}

export default function DynamicServiceHero({
  service,
  onBookingClick,
}: DynamicServiceHeroProps) {
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
    <section className="relative bg-[#FFF8ED] py-20">
      <HeroDecorations />
      
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
              mt-6
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
              mt-6
              max-w-2xl
              text-lg
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
              onClick={onBookingClick}
              className="
                inline-flex
                rounded-full
                bg-emerald-600
                px-8
                py-4
                text-lg
                font-semibold
                text-white
                transition-all
                duration-300
                hover:bg-emerald-700
                hover:shadow-lg
                hover:-translate-y-1
                active:scale-95
              "
            >
              Book Now
            </button>
          </motion.div>
        </motion.div>

        <motion.div className="flex-1" variants={imageVariants}>
          <Image
            src={service.image}
            alt={service.title}
            width={700}
            height={500}
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