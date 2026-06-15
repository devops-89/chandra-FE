'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import type { ProfileSummaryCardProps } from '@/types/technicianApplication/reviewSubmit.types';

import { cardHoverVariants } from '../animations/reviewAnimations';

export default function ProfileSummaryCard({
  profile,
  onEdit,
}: ProfileSummaryCardProps) {
  return (
    <motion.div
      className="md:col-span-7 h-full bg-surface-white rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-surface-container-low"
      variants={cardHoverVariants}
      initial="initial"
      whileHover="hover"
    >
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-2xl font-bold text-emerald-deep">Profile Summary</h3>
        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="text-primary font-semibold flex items-center gap-1 hover:underline cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-sm">edit</span>
            Edit
          </button>
        )}
      </div>

      <div className="flex gap-6 items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary-fixed shrink-0">
          <Image
            alt={profile.name}
            width={96}
            height={96}
            src={profile.avatarUrl}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        <div className="space-y-1">
          <p className="text-2xl font-bold">{profile.name}</p>
          <p className="text-charcoal-light">
            {profile.title} • {profile.experience} Years Exp.
          </p>
          <div className="flex items-center gap-2 text-charcoal-light">
            <span className="material-symbols-outlined text-sm">location_on</span>
            <span>{profile.location}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
