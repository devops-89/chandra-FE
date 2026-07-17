import { AREA_OPTIONS } from '@/constants/technicianApplication/serviceAreaOptions';
import type { AreaOption } from '@/types/technicianOnboarding/serviceArea.types';

export const getAreaOptions = (): AreaOption[] => {
  return AREA_OPTIONS;
};

export const getAreaByValue = (value: number): AreaOption | undefined => {
  return AREA_OPTIONS.find((option) => option.value === value);
};

export const getAreaKm = (value: number): number => {
  const option = getAreaByValue(value);
  return option?.km || 5;
};

// Mock locality suggestions (can be replaced with API call)
export const getLocalitySuggestions = (query: string): string[] => {
  const suggestions = [
    'Indiranagar',
    'Koramangala',
    'Whitefield',
    'JP Nagar',
    'Marathahalli',
    'Sarjapur Road',
    'Benson Town',
    'Lavelle Road',
    'MG Road',
    'Shivaji Nagar',
    'Banashankari',
    'Basavanagudi',
    'Frazer Town',
    'RT Nagar',
    'Lal Bagh',
  ];

  if (!query.trim()) return [];
  return suggestions.filter((locality) =>
    locality.toLowerCase().includes(query.toLowerCase())
  );
};

// Mock pincode validation (can be replaced with API call)
export const validatePincode = (pincode: string): boolean => {
  return /^\d{6}$/.test(pincode);
};

// Mock pincode to locality mapping (can be replaced with API call)
export const getPincodeLocality = (
  pincode: string
): string | null => {
  const pincodeMap: Record<string, string> = {
    '560038': 'Indiranagar',
    '560034': 'Koramangala',
    '560066': 'Whitefield',
    '560040': 'JP Nagar',
    '560037': 'Marathahalli',
    '560102': 'Sarjapur Road',
    '560042': 'Benson Town',
    '560001': 'Lavelle Road',
    '560002': 'MG Road',
    '560003': 'Shivaji Nagar',
  };

  return pincodeMap[pincode] || null;
};
