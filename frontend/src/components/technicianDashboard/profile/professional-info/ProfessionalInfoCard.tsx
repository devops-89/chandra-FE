'use client';

import ExperienceSection from './ExperienceSection';
import ServiceCategories from './ServiceCategories';
import SkillsSection from './SkillsSection';

export default function ProfessionalInfoCard() {
  return (
    <div
      className="
        bg-white
        border
        border-slate-200
        rounded-3xl
        p-6
        shadow-sm
      "
    >
      <h3
        className="
          text-xl
          font-bold
          text-slate-900
          mb-6
        "
      >
        Professional Information
      </h3>

      <ExperienceSection />

      <div className="my-6 border-t border-slate-200" />

      <SkillsSection />

      <div className="my-6 border-t border-slate-200" />

      <ServiceCategories />
    </div>
  );
}