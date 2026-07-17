export const SAVED_ADDRESSES = {
  home: {
    id: 'home' as const,
    label: 'Home Address',
    address: '123 Main Street, Delhi',
  },
  office: {
    id: 'office' as const,
    label: 'Office Address', 
    address: 'Sector 62, Noida',
  },
} as const;