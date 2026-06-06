import type { LucideIcon } from 'lucide-react';

export interface StatsCardData {
  icon: LucideIcon;
  title: string;
  value: string | number;
  isHighlighted?: boolean;
}

export interface StatsCardProps {
  icon: React.ElementType;
  title: string;
  value: string | number;
  isHighlighted?: boolean;
}