'use client';

import StarIcon from '@mui/icons-material/Star';
import { motion } from 'framer-motion';

import { TestimonialAvatar } from '@/components/testimonial&StarRating section/TestimonialAvatar';
import type { Testimonial } from '@/types/testimonial.types';

interface Props {
  testimonial: Testimonial;
  index?: number;
}

export function TestimonialCard({
  testimonial,
  index = 0,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.2,
        ease: 'easeOut' as any 
      }}
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
        <div className="flex items-center gap-4 text-slate-950">
          <TestimonialAvatar
            src={testimonial.avatar}
            alt={testimonial.name}
          />

          <div>
            <h4 className="font-semibold">
              {testimonial.name}
            </h4>

            <p className="text-slate-950">
              {testimonial.designation},{' '}
              {testimonial.location}
            </p>
          </div>
        </div>

        <div className="flex items-center text-slate-950 gap-1">
          <span className="text-3xl">
            {testimonial.rating}
          </span>

          <StarIcon
            sx={{
              color: '#009966',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}