import type { ServiceDetail } from '@/types/serviceDetails.types';

export const acServicingData: ServiceDetail = {
  slug: 'ac-servicing',

  title: 'Professional AC Servicing',

  subtitle:
    'Keep your cooling systems running efficiently.',

  description:
    'Improve cooling performance and extend the life of your air conditioner with professional servicing and maintenance.',

  image: '/images/services/ac-servicing.png',

  startingPrice: '₹599',

  features: [
    'Filter Cleaning',
    'Gas Check',
    'Cooling Inspection',
    'Outdoor Unit Cleaning',
    'Performance Testing',
  ],

  ctaText: 'Book AC Service',
};