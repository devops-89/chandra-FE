import { TestimonialGrid } from '@/components/testimonial&StarRating section/TestimonialGrid';
import { TestimonialHeader } from '@/components/testimonial&StarRating section/TestimonialHeader';

export function TestimonialSection() {
  return (
    <section
      id="testimonials"
      className="bg-white py-24"
    >
      <div className="mx-auto max-w-7xl px-4">
        <TestimonialHeader />
        <TestimonialGrid />
      </div>
    </section>
  );
}