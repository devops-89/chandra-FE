import type {Service} from '@/types/services.types'

export const services: Service[] = [
  {
    id: 1,
    title: 'Solar Cleaning',
    description: 'Professional cleaning to maximize solar panel efficiency and longevity',
    image: '/images/services/solar-cleaning.png',
    gridSize: { md: 5 },
  },
  {
    id: 2,
    title: 'Plumbing',
    description: 'Quick fixes for leaks, blockages, and installations',
    image: '/images/services/plumbing.png',
    gridSize: { md: 7 },
  },
  {
    id: 3,
    title: 'Electrical',
    description: 'Safe and reliable electrical repairs and setup',
    image: '/images/services/electrical.png',
    gridSize: { md: 7 },
  },
  {
    id: 4,
    title: 'AC Servicing',
    description: 'Keep your cooling systems running efficiently',
    image: '/images/services/ac-servicing.png',
    gridSize: { md: 5 },
  },
];