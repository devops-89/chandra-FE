import { Calendar, CheckCircle, Clock, MapPin } from 'lucide-react';

import type { StatsCardData } from '@/types/dashboardOverview.types';

export const DASHBOARD_STATS_DATA: StatsCardData[] = [
  {
    icon: Calendar,
    title: 'Total Bookings',
    value: 15,
    isHighlighted: false,
  },
  {
    icon: Clock,
    title: 'Active Services', 
    value: 1,
    isHighlighted: true,
  },
  {
    icon: CheckCircle,
    title: 'Completed Services',
    value: 12,
    isHighlighted: false,
  },
  {
    icon: MapPin,
    title: 'Saved Addresses',
    value: 2,
    isHighlighted: false,
  },
];