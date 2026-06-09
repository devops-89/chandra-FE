import SkillCard from './SkillCard';
import type { Skill } from '@/types/technicianApplication/skillTagging.types';

interface SkillGridProps {
  skills: Skill[];
  selectedSkills: string[];
  onSelectSkill: (skillId: string) => void;
}

export default function SkillGrid({
  skills,
  selectedSkills,
  onSelectSkill,
}: SkillGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {skills.map((skill) => (
        <SkillCard
          key={skill.id}
          skill={skill}
          isSelected={selectedSkills.includes(skill.id)}
          onSelect={onSelectSkill}
        />
      ))}
    </div>
  );
}
