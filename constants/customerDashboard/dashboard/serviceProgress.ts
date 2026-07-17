import { BadgeCheck, Check, Truck, UserCheck, Wrench } from 'lucide-react';

export const SERVICE_PROGRESS_STEPS = [
  {
    label: 'Booked',
    icon: Check,
  },
  {
    label: 'Assigned',
    icon: UserCheck,
  },
  {
    label: 'On Way',
    icon: Truck,
  },
  {
    label: 'Started',
    icon: Wrench,
  },
  {
    label: 'Completed',
    icon: BadgeCheck,
  },
] as const;

export const SERVICE_PROGRESS_CURRENT_STEP = 1;
