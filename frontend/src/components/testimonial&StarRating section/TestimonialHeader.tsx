'use client';

import { motion } from 'framer-motion';

import { SliderControls } from '@/components/testimonial&StarRating section/SliderControls';

export function TestimonialHeader() {
  return (
    <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div>
        <motion.h2
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-4xl font-bold tracking-[-0.04em] text-slate-950 md:text-5xl"
        >
          Real Stories from{' '}
          <span className="text-emerald-600">
            Real Users
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.18, ease: 'easeOut' }}
          className="mt-4 text-lg text-slate-950"
        >
          Success Stories: Better Decisions Through Better Organization
        </motion.p>
      </div>

      <SliderControls />
    </div>
  );
}
