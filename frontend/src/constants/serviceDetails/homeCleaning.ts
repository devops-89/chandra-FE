import type { ServiceDetail } from '@/types/serviceDetails.types';

export const homeCleaningData: ServiceDetail = {
  slug: 'home-cleaning',

  title: 'Professional Solar Panel Cleaning',

  subtitle:
    'Maximize your solar panel efficiency and longevity with professional cleaning.',

  description:
    'Our trained technicians use specialized equipment and techniques to safely clean your solar panels, ensuring optimal energy production.',

  image: '/images/services/solar-cleaning.png',

  startingPrice: '₹899',

  features: [
    'Panel Surface Cleaning',
    'Inverter Inspection',
    'Connection Check',
    'Performance Assessment',
    'Safety Inspection',
  ],

  ctaText: 'Book Solar Cleaning',
};