import { SKILL_LEVELS } from '@/constants/technicianApplication/skillTagging.constants';
import type { SkillLevelSelectorProps } from '@/types/technicianApplication/skillTagging.types';

export default function SkillLevelSelector({
  selected,
  onSelect,
}: SkillLevelSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-gray-900">Skill Level</h3>
      <div className="flex gap-3">
        {SKILL_LEVELS.map((level) => (
          <button
            key={level.level}
            onClick={() => onSelect(level.level)}
            className={`
              rounded-full px-4 py-2 font-medium transition-all duration-200
              cursor-pointer
              ${
                selected === level.level
                  ? 'bg-emerald-700 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            {level.label}
          </button>
        ))}
      </div>
    </div>
  );
}
