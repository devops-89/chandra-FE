'use client';

import { motion } from 'framer-motion';

import type { Service } from '@/types/services.types';

interface DynamicServiceFeaturesProps {
  service: Service;
}

export default function DynamicServiceFeatures({
  service,
}: DynamicServiceFeaturesProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        type: 'spring' as const,
        bounce: 0.3,
      },
    },
  };

  return (
    <section className="bg-slate-50 rounded-2xl shadow-lg py-20">
      <motion.div
        className="mx-auto max-w-6xl px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            What&apos;s Included
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Our comprehensive service includes everything you need for optimal results
          </p>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
        >
          {service.includes.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="
                rounded-2xl
                bg-white
                p-6
                shadow-sm
                border
                border-slate-100
                hover:shadow-md
                transition-shadow
                duration-300
              "
            >
              <div className="flex items-center gap-3">
                <div className="
                  shrink-0
                  w-10
                  h-10
                  rounded-full
                  bg-emerald-100
                  flex
                  items-center
                  justify-center
                ">
                  <svg 
                    className="w-5 h-5 text-emerald-600" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900">
                  {feature}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}