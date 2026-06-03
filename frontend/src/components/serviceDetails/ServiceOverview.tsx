'use client';

import { motion } from 'framer-motion';

import type { ServiceDetail } from '@/types/serviceDetails.types';

interface ServiceOverviewProps {
  service: ServiceDetail;
}

export default function ServiceOverview({
  service,
}: ServiceOverviewProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        type: 'spring' as const,
        bounce: 0.3,
      },
    },
  };

  return (
    <section className="bg-white py-20">
      <motion.div
        className="mx-auto max-w-5xl flex flex-col gap-6 px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
      >
        <motion.h2
          variants={itemVariants}
          className="
            text-5xl
            font-bold
            text-slate-900
            text-center
          "
        >
          Service Overview
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="
            text-lg
            leading-relaxed
            text-slate-600
            max-w-3xl
            mx-auto
            text-center
            tracking-wide
          "
        >
          {service.description}
        </motion.p>
      </motion.div>
    </section>
  );
}
