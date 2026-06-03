import type { ServiceDetail } from '@/types/serviceDetails.types';

export const plumbingData: ServiceDetail = {
  slug: 'plumbing',

  title: 'Professional Plumbing Services',

  subtitle:
    'Quick fixes and complete plumbing solutions for your home.',

  description:
    'Our expert plumbing services are designed to keep your water systems running smoothly and efficiently. Whether you are dealing with leaking pipes, clogged drains, faulty faucets, water pressure issues, or new fixture installations, our experienced plumbers deliver fast and dependable solutions. We focus on long-lasting repairs and quality workmanship to help prevent costly future problems and maintain the comfort of your property.',

  image: '/images/services/plumbing.png',

  startingPrice: '₹399',

  features: [
    'Leak Repair',
    'Drain Cleaning',
    'Tap Installation',
    'Pipe Repair',
    'Bathroom Fittings',
  ],

  ctaText: 'Book Plumbing Service',
};