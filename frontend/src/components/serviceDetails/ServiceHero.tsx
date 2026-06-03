'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import type { ServiceDetail } from '@/types/serviceDetails.types';

interface ServiceHeroProps {
  service: ServiceDetail;
}

export default function ServiceHero({
  service,
}: ServiceHeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1.5,
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
    <section className="bg-[#F7F2E8] py-20">
      <motion.div
        className="
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
            Professional Service
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
            {service.subtitle}
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
              {service.startingPrice}
            </p>
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
