import { SAVED_ADDRESSES } from '@/constants/booking/savedAddresses';

export const getAddressFromSelection = (
  selectedAddress: 'home' | 'office' | 'new',
  newAddress: string
): string => {
  switch (selectedAddress) {
    case 'home':
      return SAVED_ADDRESSES.home.address;
    case 'office':
      return SAVED_ADDRESSES.office.address;
    case 'new':
      return newAddress.trim();
    default:
      return '';
  }
};

export const getAddressSelectionFromSaved = (savedAddress: string): {
  selectedAddress: 'home' | 'office' | 'new';
  newAddress: string;
} => {
  if (savedAddress === SAVED_ADDRESSES.home.address) {
    return { selectedAddress: 'home', newAddress: '' };
  }
  
  if (savedAddress === SAVED_ADDRESSES.office.address) {
    return { selectedAddress: 'office', newAddress: '' };
  }
  
  return { selectedAddress: 'new', newAddress: savedAddress };
};