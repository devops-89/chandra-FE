import type { ServiceDetail } from '@/types/serviceDetails.types';

export const electricalData: ServiceDetail = {
  slug: 'electrical',

  title: 'Professional Electrical Services',

  subtitle:
    'Safe and reliable electrical repairs and installations.',

  description:
    'Our certified electricians handle repairs, installations, and maintenance work while ensuring complete safety and compliance.',

  image: '/images/services/electrical.png',

  startingPrice: '₹499',

  features: [
    'Switch Repair',
    'Fan Installation',
    'Wiring Solutions',
    'Lighting Setup',
    'Power Issue Diagnosis',
  ],

  ctaText: 'Book Electrical Service',
};