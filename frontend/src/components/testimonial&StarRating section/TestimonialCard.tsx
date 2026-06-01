import StarIcon from '@mui/icons-material/Star';

import type { Testimonial } from '@/types/testimonial.types';

import { TestimonialAvatar } from '@/components/testimonial&StarRating section/TestimonialAvatar';

interface Props {
  testimonial: Testimonial;
}

export function TestimonialCard({
  testimonial,
}: Props) {
  return (
    <div
      className="
      h-full
      rounded-[28px]
      bg-[#f6f3ea]
      p-8
      shadow-lg
      "
    >
      <p className="text-xl leading-10 text-slate-700">
        {testimonial.review}
      </p>

      <div className="mt-12 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <TestimonialAvatar
            src={testimonial.avatar}
            alt={testimonial.name}
          />

          <div>
            <h4 className="font-semibold">
              {testimonial.name}
            </h4>

            <p className="text-slate-500">
              {testimonial.designation},{' '}
              {testimonial.location}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-3xl">
            {testimonial.rating}
          </span>

          <StarIcon
            sx={{
              color: '#7c3aed',
            }}
          />
        </div>
      </div>
    </div>
  );
}