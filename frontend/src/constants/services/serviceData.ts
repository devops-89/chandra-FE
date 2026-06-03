import type {Service} from '@/types/services.types'

export const services: Service[] = [
  {
    id: 1,
    title: 'Solar Cleaning',
    description: 'Professional cleaning to maximize solar panel efficiency and longevity',
    image: '/images/services/solar-cleaning.png',
    slug: 'solar-cleaning',
    gridSize: { md: 5 },
  },
  {
    id: 2,
    title: 'Plumbing',
    description: 'Quick fixes for leaks, blockages, and installations',
    image: '/images/services/plumbing.png',
    slug: 'plumbing',
    gridSize: { md: 7 },
  },
  {
    id: 3,
    title: 'Electrical',
    description: 'Safe and reliable electrical repairs and setup',
    image: '/images/services/electrical.png',
    slug: 'electrical',
    gridSize: { md: 7 },
  },
  {
    id: 4,
    title: 'AC Servicing',
    description: 'Keep your cooling systems running efficiently',
    image: '/images/services/ac-servicing.png',
    slug: 'ac-servicing',
    gridSize: { md: 5 },
  },
];