import type { ServiceDetail } from '@/types/serviceDetails.types';

export const electricalData: ServiceDetail = {
  slug: 'electrical',

  title: 'Professional Electrical Services',

  subtitle:
    'Safe and reliable electrical repairs and installations.',

  description:
    'From minor repairs to complete electrical installations, our certified electricians provide reliable and safe solutions for homes and businesses. We handle wiring, switchboard upgrades, lighting installations, power outlet repairs, circuit troubleshooting, and preventive maintenance. Every job is completed with strict adherence to safety standards, ensuring efficient performance and peace of mind for our customers.',

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