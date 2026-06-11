import type { Skill, SkillLevel } from '@/types/technicianApplication/skillTagging.types';
import { SolarPanelIcon, Wrench, Pipette, Zap } from 'lucide-react';

export const AVAILABLE_SKILLS: Skill[] = [
  {
    id: 'solar-cleaning',
    name: 'Solar Cleaning',
    description: 'Maintenance and deep cleaning of residential/commercial solar panels.',
    icon: "☀️",
  },
  {
    id: 'ac-repair',
    name: 'AC Repair',
    description: 'Maintenance and repair of air conditioning systems.',
    icon: Wrench,
  },
  {
    id: 'plumbing',
    name: 'Plumbing',
    description: 'Plumbing installation and repair services.',
    icon: Pipette,
  },
  {
    id: 'electrical',
    name: 'Electrical',
    description: 'Electrical installation and repair services.',
    icon: Zap,
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
