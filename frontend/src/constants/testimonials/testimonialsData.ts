import type {
  Testimonial,
  RatingSummary,
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
      "I've always been a self-learner, but it's easy to lose track or feel unsure about your progress when you're studying alone. ThinkDeck solved that for me.",
    name: 'Anirudh K.',
    designation: 'Software Developer',
    location: 'India',
    rating: 4.5,
    avatar: '/avatars/user-1.jpg',
  },

  {
    id: 2,
    review:
      'We introduced ThinkDeck to our classroom as a supplementary tool, and the results have been incredible. Students are more engaged and motivated.',
    name: 'Prof. Prakash',
    designation: 'Macc Institution',
    location: 'New Delhi, India',
    rating: 4.8,
    avatar: '/avatars/user-2.jpg',
  },
];