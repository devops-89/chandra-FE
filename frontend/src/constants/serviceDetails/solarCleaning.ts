import type { ServiceDetail } from '@/types/serviceDetails.types';

export const solarCleaningData: ServiceDetail = {
  slug: 'solar-cleaning',

  title: 'Professional Solar Panel Cleaning',

  subtitle:
    'Maximize your solar panel efficiency and longevity with professional cleaning.',

  description:
    'Keep your solar panels performing at their highest efficiency with our professional solar panel cleaning service. Dust, dirt, bird droppings, and environmental pollutants can significantly reduce energy production over time. Our trained technicians use safe, non-abrasive cleaning techniques to remove buildup and restore optimal sunlight absorption. Whether for residential rooftops or commercial installations, we help maximize your solar investment while extending the lifespan of your panels.',

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