import type { LucideIcon } from 'lucide-react';

import type { SkillCardProps } from '@/types/technicianApplication/skillTagging.types';

export default function SkillCard({
  skill,
  isSelected,
  onSelect,
}: SkillCardProps) {
  // Check if icon is a Lucide icon component or string
  const Icon = typeof skill.icon === 'function' ? (skill.icon as LucideIcon) : null;
  const iconString = typeof skill.icon === 'string' ? skill.icon : null;

  return (
    <button
      type="button"
      onClick={() => onSelect(skill.id)}
      className={`
        group w-full min-h-5 rounded-2xl bg-white p-10 text-left
        shadow-sm transition-all duration-300 cursor-pointer
        hover:-translate-y-1 hover:shadow-lg
        ${
          isSelected
            ? 'border-2 border-emerald-700 bg-emerald-50'
            : 'border border-gray-100'
        }
      `}
    >
      {/* Icon */}
      <div
        className={`
          flex h-8 w-8 items-center justify-center rounded-xl
          transition-colors duration-300
          ${
            isSelected
              ? 'bg-emerald-100'
              : 'bg-gray-100 group-hover:bg-emerald-50'
          }
        `}
      >
        {Icon ? (
          <Icon
            size={24}
            className={isSelected ? 'text-emerald-700' : 'text-gray-600'}
          />
        ) : (
          iconString && <span className="text-3xl">{iconString}</span>
        )}
      </div>

      {/* Content */}
      <div className="mt-8">
        <h3 className="text-xl font-medium text-gray-900">
          {skill.name}
        </h3>

        <p className="mt-4 text-lg leading-8 text-gray-500">
          {skill.description}
        </p>
      </div>

      {/* Selected Badge */}
      {isSelected && (
        <div className="absolute right-6 top-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700">
            <svg
              className="h-5 w-5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              />
            </svg>
          </div>
        </div>
      )}
    </button>
  );
}