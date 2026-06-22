'use client';

import { motion } from 'framer-motion';

import type { Service } from '@/types/services.types';

interface DynamicServicePricingProps {
  service: Service;
}

export default function DynamicServicePricing({
  service,
}: DynamicServicePricingProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        type: 'spring' as const,
        bounce: 0.3,
      },
    },
  };

  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-4xl px-4">
        <motion.div
          className="text-center mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Transparent Pricing
          </h2>
          <p className="text-lg text-slate-600">
            No hidden fees, no surprises. Just professional service at a fair price.
          </p>
        </motion.div>

        <motion.div
          className=" rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-8 text-center md:p-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="mb-6">
            <span className="text-2xl font-semibold text-slate-600">
              Starting from
            </span>
            <div className="mt-2">
              <span className="text-6xl font-bold text-emerald-600">
                ₹{service.price}
              </span>
            </div>
          </div>

          <div className="space-y-3 text-slate-600">
            <div className="flex items-center justify-center gap-2">
              <svg className="h-5 w-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Professional certified technicians</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <svg className="h-5 w-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>All tools and equipment included</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <svg className="h-5 w-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>100% satisfaction guarantee</span>
            </div>
          </div>

          <div className="mt-8 text-sm text-slate-500">
            *Final price may vary based on service requirements and location
          </div>
        </motion.div>
      </div>
    </section>
  );
}