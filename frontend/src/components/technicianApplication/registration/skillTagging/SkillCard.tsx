import type { SkillCardProps } from '@/types/technicianApplication/skillTagging.types';

export default function SkillCard({
  skill,
  isSelected,
  onSelect,
}: SkillCardProps) {
  return (
    <button
      onClick={() => onSelect(skill.id)}
      className={`
        w-full rounded-xl border-2 p-6 text-left transition-all duration-200
        cursor-pointer hover:shadow-md
        ${
          isSelected
            ? 'border-emerald-700 bg-green-50'
            : 'border-gray-200 bg-white hover:border-emerald-200'
        }
      `}
    >
      <div className="flex items-center justify-between">
        <h3 className={`text-lg font-semibold ${
          isSelected ? 'text-emerald-700' : 'text-gray-900'
        }`}>
          {skill.name}
        </h3>
        {isSelected && (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-700">
            <svg
              className="h-4 w-4 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
    </button>
  );
}
