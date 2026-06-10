import type { AreaOption } from '@/types/technicianOnboarding/serviceArea.types';

export const AREA_OPTIONS: AreaOption[] = [
  { value: 0, label: '5 km', km: 5 },
  { value: 1, label: '10 km', km: 10 },
  { value: 2, label: '15 km', km: 15 },
  { value: 3, label: '20 km', km: 20 },
  { value: 4, label: '30 km', km: 30 },
  { value: 5, label: '50 km', km: 50 },
];

export const SERVICE_AREA_TEXT = {
  header: {
    title: 'What is your preferred service area?',
    description: 'Let us know the areas you are comfortable serving. This helps us match you with the right opportunities.',
  },
  areaSection: 'Service Area',
  preferredAreasLabel: 'Preferred Areas',
  preferredAreasPlaceholder: 'Search and add localities...',
  pincodeLabel: 'Pincode Coverage',
  pincodePlaceholder: 'Enter pincode...',
  coverageSummaryTitle: 'Service Coverage',
  previousButton: 'Previous',
  submitButton: 'Complete Setup',
};
