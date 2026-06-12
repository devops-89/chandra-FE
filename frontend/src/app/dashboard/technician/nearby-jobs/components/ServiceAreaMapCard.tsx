'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ServiceAreaMapCardProps {
  onExpandRange?: () => void;
}

export default function ServiceAreaMapCard({ onExpandRange = () => {} }: ServiceAreaMapCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      whileHover={{ y: -4 }}
      className="bg-surface-white p-2 rounded-lg sm:rounded-xl ambient-shadow overflow-hidden group"
    >
      {/* Map Image Container */}
      <div className="relative h-40 sm:h-48 md:h-64 rounded-lg overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.7 }}
          className="w-full h-full"
        >
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpl2Quw5lYouQtCIKz5gC9A_Ix-hBbhbNjevPZda4cAF8_MxEhj1t-mRDoGyjFDtKVh4uC8chgtGXM0c2IjQPZJcOuMvl97sQrKKGqsDpdjW43-B9ZiUzoJpfGC3uotwJrFjTnthXxYsvKqNU7QacUBkx9ChsTtzMviIZnPS3iRU-aP47J-rsCOToqm8o0eWYZ2Hk2Q9OWca41UPLDW9_oVxGzvSLHhxDC6_5lzhCIC5BcboOgYuEjKPX6Hb30rNGOqHgNLICzmiE"
            alt="Service area map showing Gurgaon Sector 50-60"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent flex items-end p-2 sm:p-4">
          <div className="text-white">
            <p className="font-bold text-xs sm:text-sm md:text-base">Active Service Area</p>
            <p className="text-label-sm opacity-90 text-xs sm:text-sm">Gurgaon Sector 50-60</p>
          </div>
        </div>

        {/* Marker Overlay */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
        >
          <span className="material-symbols-outlined text-primary text-3xl sm:text-4xl filled">
            location_on
          </span>
          <div className="w-4 h-1 bg-black/20 rounded-full blur-[1px]" />
        </motion.div>
      </div>

      {/* Expand Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="p-3 sm:p-4 md:p-6"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onExpandRange}
          className="w-full py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl border border-primary text-primary font-bold text-sm sm:text-base hover:bg-success-mint transition-all"
        >
          Expand Range
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
