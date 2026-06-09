export interface Skill {
  id: string;
  name: string;
  icon?: string;
}

export interface SkillLevel {
  level: 'novice' | 'intermediate' | 'expert';
  label: string;
}

export interface SkillTaggingState {
  selectedSkills: string[];
  skillLevel: SkillLevel['level'] | null;
  brandExpertise: string[];
}

export interface SkillCardProps {
  skill: Skill;
  isSelected: boolean;
  onSelect: (skillId: string) => void;
}

export interface SkillLevelSelectorProps {
  selected: SkillLevel['level'] | null;
  onSelect: (level: SkillLevel['level']) => void;
}

export interface BrandExpertiseInputProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

export interface BrandTagProps {
  name: string;
  onRemove: () => void;
}
