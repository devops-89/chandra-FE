'use client';

import { motion } from 'framer-motion';

import ServiceCoverageMap from '@/components/technicianApplication/serviceArea/ServiceCoverageMap';
import { getAreaKm } from '@/data/technicianOnboarding/serviceAreaData';
import type { ServiceCoverageCardProps } from '@/types/technicianApplication/reviewSubmit.types';

import { cardHoverVariants, pulseVariants } from '../animations/reviewAnimations';

export default function ServiceCoverageCard({
  radius,
  latitude,
  longitude,
  fullAddress,
}: ServiceCoverageCardProps) {
  const radiusKm = getAreaKm(radius);
  const hasLocation =
    typeof latitude === 'number'
    && typeof longitude === 'number';

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
          <span className="text-sm font-semibold">{radiusKm}km Radius Active</span>
        </div>
      </div>

      <div className="h-52 overflow-hidden rounded-lg border border-slate-200">
        {hasLocation ? (
          <ServiceCoverageMap
            latitude={latitude}
            longitude={longitude}
            radiusKm={radiusKm}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-slate-100 px-4 text-center text-sm font-semibold text-slate-500">
            Please select your service location to preview coverage.
          </div>
        )}
      </div>

      {fullAddress && (
        <div className="mt-4 flex items-start gap-2 rounded-lg border border-slate-100 bg-slate-50 p-3">
          <span className="material-symbols-outlined mt-0.5 text-sm text-gray-500">location_on</span>
          <div className="text-xs font-medium leading-relaxed text-gray-600">
            <span className="block font-semibold text-gray-700">Service Center Address:</span>
            {fullAddress}
          </div>
        </div>
      )}
    </motion.div>
  );
}
