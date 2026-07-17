import type { LucideIcon } from 'lucide-react';

// ─── Service card (fetched from backend) ─────────────────────────────────────

export interface ServiceOption {
  id: number;
  name: string;
  description: string;
  image?: string;
  icon?: string | LucideIcon;
}

export interface ServiceCardProps {
  service: ServiceOption;
  isSelected: boolean;
  onSelect: (serviceId: number) => void;
}

// ─── Brand expertise ─────────────────────────────────────────────────────────

export interface BrandExpertiseEntry {
  brandName: string;
}

export interface BrandExpertiseInputProps {
  tags: BrandExpertiseEntry[];
  onAddTag: (tag: BrandExpertiseEntry) => void;
  onRemoveTag: (brandName: string) => void;
}

export interface BrandTagProps {
  name: string;
  onRemove: () => void;
}

// ─── Main form state ──────────────────────────────────────────────────────────

export interface SkillsEquipmentState {
  yearsOfExperience: number | '';
  languages: string[];
  services: { serviceId: number }[];
  brandExpertise: BrandExpertiseEntry[];
  hasLadder: boolean;
  hasACGauges: boolean;
  hasSafetyEquipment: boolean;
  hasVehicle: boolean;
  gst: string;
}
