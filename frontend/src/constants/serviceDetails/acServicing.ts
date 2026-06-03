import type { ServiceDetail } from '@/types/serviceDetails.types';

export const acServicingData: ServiceDetail = {
  slug: 'ac-servicing',

  title: 'Professional AC Servicing',

  subtitle:
    'Keep your cooling systems running efficiently.',

  description:
    'Stay comfortable all year round with our comprehensive air conditioning services. Our skilled technicians specialize in AC cleaning, maintenance, gas refilling, performance optimization, diagnostics, and repairs for all major brands. Regular servicing improves cooling efficiency, reduces energy consumption, and extends the lifespan of your system. We ensure your air conditioner operates at peak performance, providing a healthier and more comfortable indoor environment.',

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