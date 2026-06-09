import type { Skill, SkillLevel } from '@/types/technicianApplication/skillTagging.types';

export const AVAILABLE_SKILLS: Skill[] = [
  {
    id: 'solar-cleaning',
    name: 'Solar Cleaning',
  },
  {
    id: 'ac-repair',
    name: 'AC Repair',
  },
  {
    id: 'plumbing',
    name: 'Plumbing',
  },
  {
    id: 'electrical',
    name: 'Electrical',
  },
];

export const SKILL_LEVELS: SkillLevel[] = [
  {
    level: 'novice',
    label: 'Novice',
  },
  {
    level: 'intermediate',
    label: 'Intermediate',
  },
  {
    level: 'expert',
    label: 'Expert',
  },
];
