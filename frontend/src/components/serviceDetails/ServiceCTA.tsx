'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import type { ServiceDetail } from '@/types/serviceDetails.types';

interface ServiceCTAProps {
  service: ServiceDetail;
}

export default function ServiceCTA({
  service,
}: ServiceCTAProps) {
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
          Ready To Book?
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="
            mt-4
            text-lg
            text-emerald-50
          "
        >
          Schedule your service today and
          get professional assistance at
          your doorstep.
        </motion.p>

        <motion.div variants={itemVariants}>
          <Link
            href={`/booking?service=${encodeURIComponent(service.title)}`}
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
              hover:-translate-y-1
            "
          >
            {service.ctaText}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
