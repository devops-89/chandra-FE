'use client';

import { motion } from 'framer-motion';

import type { SkillsSummaryCardProps } from '@/types/technicianApplication/reviewSubmit.types';

import { cardHoverVariants, skillTagVariants,staggerContainerVariants } from '../animations/reviewAnimations';

export default function SkillsSummaryCard({
  skills,
  certificationLevel,
  onEdit,
}: SkillsSummaryCardProps) {
  return (
    <motion.div
      className="md:col-span-5 bg-surface-white rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-surface-container-low"
      variants={cardHoverVariants}
      initial="initial"
      whileHover="hover"
    >
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-2xl font-bold text-emerald-deep">Skills</h3>
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

      <motion.div
        className="flex flex-wrap gap-2"
        variants={staggerContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {skills.map((skill) => (
          <motion.span
            key={skill}
            className="bg-tertiary-fixed text-emerald-deep px-3 py-1 rounded-full text-sm font-semibold border border-outline-variant"
            variants={skillTagVariants}
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>

      <div className="mt-6 pt-6 border-t border-surface-container-highest">
        <p className="text-xs font-semibold text-charcoal-light uppercase tracking-wider mb-2">
          Certification Level
        </p>
        <p className="text-2xl font-bold text-on-surface">{certificationLevel}</p>
      </div>
    </motion.div>
  );
}
