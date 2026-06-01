import Grid from '@mui/material/Grid';

import { testimonials } from '@/constants/testimonials/testimonialsData';

import { RatingSummaryCard } from './RatingSummaryCard';
import { TestimonialCard } from './TestimonialCard';

export function TestimonialGrid() {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, lg: 3 }}>
        <RatingSummaryCard />
      </Grid>

      {testimonials.map((testimonial) => (
        <Grid
          key={testimonial.id}
          size={{ xs: 12, md: 6, lg: 4.5 }}
        >
          <TestimonialCard
            testimonial={testimonial}
          />
        </Grid>
      ))}
    </Grid>
  );
}