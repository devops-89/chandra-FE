'use client';

import { motion } from 'framer-motion';

import type { SkillsSummaryCardProps } from '@/types/technicianApplication/reviewSubmit.types';

import { cardHoverVariants, skillTagVariants, staggerContainerVariants } from '../animations/reviewAnimations';

export default function SkillsSummaryCard({
  services,
  yearsOfExperience,
  languages,
  brandExpertise,
  hasLadder,
  hasACGauges,
  hasSafetyEquipment,
  hasVehicle,
  onEdit,
}: SkillsSummaryCardProps) {
  const equipmentList = [
    { label: 'Ladder',           has: hasLadder },
    { label: 'AC Gauges',        has: hasACGauges },
    { label: 'Safety Equipment', has: hasSafetyEquipment },
    { label: 'Vehicle',          has: hasVehicle },
  ];

  return (
    <motion.div
      className="md:col-span-5 bg-surface-white rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-surface-container-low"
      variants={cardHoverVariants}
      initial="initial"
      whileHover="hover"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-2xl font-bold text-emerald-deep">Skills &amp; Equipments</h3>
        {onEdit && (
          <button
            onClick={onEdit}
            className="text-primary font-semibold flex items-center gap-1 hover:underline cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-sm">edit</span>
            Edit
          </button>
        )}
      </div>

      <div className="space-y-5">
        {/* Services */}
        {services.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-charcoal-light uppercase tracking-wider mb-2">
              Services
            </p>
            <motion.div
              className="flex flex-wrap gap-2"
              variants={staggerContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {services.map((s) => (
                <motion.span
                  key={s.serviceId}
                  className="bg-tertiary-fixed text-emerald-deep px-3 py-1 rounded-full text-sm font-semibold border border-outline-variant"
                  variants={skillTagVariants}
                >
                  {s.serviceName ?? `Service #${s.serviceId}`}
                </motion.span>
              ))}
            </motion.div>
          </div>
        )}

        {/* Years of Experience */}
        {yearsOfExperience != null && (
          <div>
            <p className="text-xs font-semibold text-charcoal-light uppercase tracking-wider mb-1">
              Experience
            </p>
            <p className="text-base font-medium text-on-surface">
              {yearsOfExperience} {yearsOfExperience === 1 ? 'Year' : 'Years'}
            </p>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-charcoal-light uppercase tracking-wider mb-2">
              Languages
            </p>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <span
                  key={lang}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Brand Expertise */}
        {brandExpertise.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-charcoal-light uppercase tracking-wider mb-2">
              Brand Expertise
            </p>
            <div className="flex flex-wrap gap-2">
              {brandExpertise.map((b) => (
                <span
                  key={b.brandName}
                  className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {b.brandName}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Equipment */}
        <div>
          <p className="text-xs font-semibold text-charcoal-light uppercase tracking-wider mb-2">
            Equipment
          </p>
          <div className="grid grid-cols-2 gap-2">
            {equipmentList.map(({ label, has }) => (
              <div key={label} className="flex items-center gap-2 text-sm">
                <span
                  className={`material-symbols-outlined text-base ${
                    has ? 'text-emerald-600' : 'text-gray-300'
                  }`}
                >
                  {has ? 'check_circle' : 'cancel'}
                </span>
                <span className={has ? 'text-on-surface' : 'text-charcoal-light'}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
