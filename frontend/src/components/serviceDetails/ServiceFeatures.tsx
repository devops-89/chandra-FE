'use client';

import { motion } from 'framer-motion';

interface ServiceFeaturesProps {
  features: string[];
}

export default function ServiceFeatures({
  features,
}: ServiceFeaturesProps) {
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
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.5,
        type: 'spring' as const,
        bounce: 0.32,
      },
    },
  };

  return (
    <section className="bg-[#F7F2E8] py-20">
      <motion.div
        className="mx-auto max-w-7xl px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.h2
          variants={itemVariants}
          className="
            text-center
            text-5xl
            font-bold
            text-slate-900
          "
        >
          What&apos;s Included ?
        </motion.h2>

        <motion.div
          variants={containerVariants}
          className="
            mt-12
            grid
            gap-6
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {features.map((feature) => (
            <motion.div
              key={feature}
              variants={itemVariants}
              className="
                rounded-3xl
                bg-white
                p-6
                shadow-md
              "
            >
              <div className="flex items-center gap-3">
                <span
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-emerald-100
                    text-emerald-600
                  "
                >
                  ✓
                </span>

                <p
                  className="
                    font-medium
                    text-slate-800
                  "
                >
                  {feature}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
