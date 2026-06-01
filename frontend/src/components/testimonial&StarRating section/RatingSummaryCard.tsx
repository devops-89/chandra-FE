import { ratingSummary } from '@/constants/testimonials/testimonialsData';

export function RatingSummaryCard() {
  return (
    <div
      className="
      h-full
      rounded-4xl
      bg-[#009966]
      p-8
      text-white
      shadow-xl
      "
    >
      <p className="text-2xl">
        {ratingSummary.title}
      </p>

      <div className="mt-24">
        <h3 className="text-7xl font-bold text-yellow-300">
          {ratingSummary.rating}/5
        </h3>

        <p className="mt-6 text-3xl leading-snug">
          {ratingSummary.subtitle}
        </p>
      </div>
    </div>
  );
}