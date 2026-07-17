import Grid from '@mui/material/Grid';

import { RatingSummaryCard } from '@/components/testimonial&StarRating section/RatingSummaryCard';
import { TestimonialCard } from '@/components/testimonial&StarRating section/TestimonialCard';
import { testimonials } from '@/constants/testimonials/testimonialsData';

export function TestimonialGrid() {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, lg: 3 }}>
        <RatingSummaryCard index={0} />
      </Grid>

      {testimonials.map((testimonial, index) => (
        <Grid
          key={testimonial.id}
          size={{ xs: 12, md: 6, lg: 4.5 }}
        >
          <TestimonialCard
            testimonial={testimonial}
            index={index + 1}
          />
        </Grid>
      ))}
    </Grid>
  );
}