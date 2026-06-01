export interface Testimonial {
  id: number;
  review: string;
  name: string;
  designation: string;
  location: string;
  rating: number;
  avatar: string;
}

export interface RatingSummary {
  rating: number;
  title: string;
  subtitle: string;
}