import type { ChooseUsConfig } from '@/types/choose.types';

export const ChooseUs: ChooseUsConfig = {
  paragraph: 'Why Choose Us',
  heading: 'Because we care about your safety',

  image: {
    src: '/workers.png',
    alt: 'Professional service team',
  },

  cta: {
    label: 'Call Now',
    href: '/contact',
  },

  benefits: [
    'Verified & trained professionals',
    'Transparent pricing (no hidden charges)',
    'On-time service guarantee',
    'Customer support available 7 days a week',
  ],

  stats: [
    {
      value: '15000+',
      label: 'Service Provider',
    },
    {
      value: '2000+',
      label: 'Order Served',
    },
    {
      value: '4000+',
      label: '5 Star Reviewed',
    },
  ],
};