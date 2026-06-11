'use client';

import { useState } from 'react';

import { AVAILABLE_SKILLS } from '@/constants/technicianApplication/skillTagging.constants';
import type { SkillTaggingState } from '@/types/technicianApplication/skillTagging.types';

import BrandExpertiseInput from './BrandExpertiseInput';
import SkillGrid from './SkillGrid';
import SkillLevelSelector from './SkillLevelSelector';
import SkillTaggingFooter from './SkillTaggingFooter';

export default function SkillTaggingPage() {
  const [state, setState] = useState<SkillTaggingState>({
    selectedSkills: [],
    skillLevel: null,
    brandExpertise: [],
  });

  const handleSelectSkill = (skillId: string) => {
    setState((prev) => ({
      ...prev,
      selectedSkills: prev.selectedSkills.includes(skillId)
        ? prev.selectedSkills.filter((id) => id !== skillId)
        : [...prev.selectedSkills, skillId],
    }));
  };

  const handleSelectLevel = (
    level: 'novice' | 'intermediate' | 'expert'
  ) => {
    setState((prev) => ({
      ...prev,
      skillLevel: level,
    }));
  };

  const handleAddBrand = (brand: string) => {
    setState((prev) => ({
      ...prev,
      brandExpertise: [...prev.brandExpertise, brand],
    }));
  };

  const handleRemoveBrand = (brand: string) => {
    setState((prev) => ({
      ...prev,
      brandExpertise: prev.brandExpertise.filter((b) => b !== brand),
    }));
  };

  const handleNext = () => {
    // Save state to session storage or context for later use
    sessionStorage.setItem(
      'skillTaggingData',
      JSON.stringify(state)
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">
          What are your core skills?
        </h1>
        <p className="text-gray-600">
          Select the services you are certified to perform. This helps us match you with the right jobs in your area.
        </p>
      </div>

      <div className="space-y-6 bg-amber-300">
        <SkillGrid
          skills={AVAILABLE_SKILLS}
          selectedSkills={state.selectedSkills}
          onSelectSkill={handleSelectSkill}
        />

        <SkillLevelSelector
          selected={state.skillLevel}
          onSelect={handleSelectLevel}
        />

        <BrandExpertiseInput
          tags={state.brandExpertise}
          onAddTag={handleAddBrand}
          onRemoveTag={handleRemoveBrand}
        />
      </div>

      <SkillTaggingFooter onNext={handleNext} />
    </div>
  );
}
