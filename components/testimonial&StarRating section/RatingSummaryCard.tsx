'use client';

import { motion } from 'framer-motion';

import { ratingSummary } from '@/constants/testimonials/testimonialsData';

interface Props {
  index?: number;
}

export function RatingSummaryCard({ index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.2,
        ease: 'easeOut' as any 
      }}
      className="
      h-full
      rounded-4xl
      bg-[#009966]
      p-8
      text-white
      shadow-xl
      "
    >
      <p className="text-2xl">
        {ratingSummary.title}
      </p>

      <div className="mt-24">
        <h3 className="text-7xl font-bold text-yellow-300">
          {ratingSummary.rating}/5
        </h3>

        <p className="mt-6 text-3xl leading-snug">
          {ratingSummary.subtitle}
        </p>
      </div>
    </motion.div>
  );
}