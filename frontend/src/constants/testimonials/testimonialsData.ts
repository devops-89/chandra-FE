import type {
  RatingSummary,
  Testimonial,
} from '@/types/testimonial.types';

export const ratingSummary: RatingSummary = {
  rating: 4.5,
  title: 'Star Ratings & Summary',
  subtitle: 'Loved By Every Customer & Institution',
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    review:
      "Booking a service through HiChandra was incredibly easy. The technician arrived on time, completed the work professionally, and the pricing was completely transparent.",
    name: 'Anirudh K.',
    designation: 'Software Developer',
    location: 'India',
    rating: 4.5,
    avatar: '/avatars/user-1.jpg',
  },

  {
    id: 2,
    review:
      'Needed an electrician urgently and HiChandra connected me with a skilled professional within hours. The service quality exceeded my expectations.',
    name: 'Prof. Prakash',
    designation: 'Macc Institution',
    location: 'New Delhi, India',
    rating: 4.8,
    avatar: '/avatars/user-2.jpg',
  },
];