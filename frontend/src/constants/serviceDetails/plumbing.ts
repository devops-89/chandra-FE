import type { ServiceDetail } from '@/types/serviceDetails.types';

export const plumbingData: ServiceDetail = {
  slug: 'plumbing',

  title: 'Professional Plumbing Services',

  subtitle:
    'Quick fixes and complete plumbing solutions for your home.',

  description:
    'From leaking taps and blocked drains to new fixture installations, our experienced plumbers deliver reliable solutions with quality workmanship.',

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