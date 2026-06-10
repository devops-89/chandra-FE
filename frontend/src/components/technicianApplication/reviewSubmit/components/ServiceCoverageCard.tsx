'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import type { ServiceCoverageCardProps } from '@/types/technicianApplication/reviewSubmit.types';

import { cardHoverVariants, pulseVariants } from '../animations/reviewAnimations';

export default function ServiceCoverageCard({
  radius,
  areas,
  mapImageUrl,
  onEdit,
}: ServiceCoverageCardProps) {
  return (
    <motion.div
      className="md:col-span-7 bg-surface-white rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-surface-container-low overflow-hidden"
      variants={cardHoverVariants}
      initial="initial"
      whileHover="hover"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-emerald-deep">Service Coverage</h3>
        <div className="flex items-center gap-2">
          <motion.div
            className="w-3 h-3 bg-emerald-deep rounded-full"
            variants={pulseVariants}
            animate="pulse"
          />
          <span className="text-sm font-semibold">{radius}km Radius Active</span>
        </div>
      </div>

      <div className="h-48 rounded-lg overflow-hidden relative">
        <Image
          alt="Coverage Map"
          width={600}
          height={192}
          src={mapImageUrl}
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent flex items-end p-4">
          <p className="text-white text-sm font-bold">
            Serving: {areas.join(', ')}
          </p>
        </div>
      </div>

      {onEdit && (
        <button
          type="button"
          onClick={onEdit}
          className="mt-4 text-primary font-semibold flex items-center gap-1 hover:underline transition-colors text-sm"
        >
          <span className="material-symbols-outlined text-sm">edit</span>
          Edit Coverage
        </button>
      )}
    </motion.div>
  );
}
