import type { HeroContentConfig } from '@/types/hero.types';

export const heroContent: HeroContentConfig = {
  label: 'Professional cleaning service',
  heading: 'The Best House Cleaning Service',
  description:
    'Enjoy a spotless home without rearranging your day. Our trusted cleaning experts bring reliable scheduling, careful service, and fresh results for every room.',
  cta: {
    label: 'Book Now',
    href: '/book',
  },
  image: {
    src: '/images/hero-cleaning.png',
    alt: 'Professional cleaner refreshing a bright modern living room',
  },
};
