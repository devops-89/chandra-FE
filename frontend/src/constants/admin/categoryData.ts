import type { Category } from '@/types/admin/category.types';

/**
 * Seed data for service categories and subcategories.
 * In production this would be fetched from an API.
 * useCategoryManager seeds its local state from this array.
 */
export const categoriesData: Category[] = [
  {
    id: 'CAT001',
    name: 'Appliance Repair',
    subcategories: [
      { id: 'SUB001', name: 'Air Conditioner' },
      { id: 'SUB002', name: 'Washing Machine' },
      { id: 'SUB003', name: 'Refrigerator' },
    ],
  },
  {
    id: 'CAT002',
    name: 'Plumbing',
    subcategories: [
      { id: 'SUB004', name: 'Leakage' },
      { id: 'SUB005', name: 'Pipe Fitting' },
      { id: 'SUB006', name: 'Drain Cleaning' },
    ],
  },
  {
    id: 'CAT003',
    name: 'Electrical',
    subcategories: [
      { id: 'SUB007', name: 'Wiring' },
      { id: 'SUB008', name: 'Switchboard' },
      { id: 'SUB009', name: 'Fan Installation' },
    ],
  },
  {
    id: 'CAT004',
    name: 'Solar Cleaning',
    subcategories: [
      { id: 'SUB010', name: 'Panel Cleaning' },
      { id: 'SUB011', name: 'Inverter Check' },
    ],
  },
  {
    id: 'CAT005',
    name: 'Home Cleaning',
    subcategories: [
      { id: 'SUB012', name: 'Full Home' },
      { id: 'SUB013', name: 'Kitchen' },
      { id: 'SUB014', name: 'Bathroom' },
    ],
  },
  {
    id: 'CAT006',
    name: 'AC Servicing',
    subcategories: [
      { id: 'SUB015', name: 'Deep Clean' },
      { id: 'SUB016', name: 'Gas Refill' },
      { id: 'SUB017', name: 'Installation' },
    ],
  },
];
