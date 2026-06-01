import type { OfferBanner } from '@/types/offer.types';

interface OfferBannerCardProps {
  banner: OfferBanner;
}

export function OfferBannerCard({
  banner,
}: OfferBannerCardProps) {
  return (
    <div
      className="
        flex
        h-65
        items-center
        justify-center
        rounded-xl
        bg-gray-200
      "
    >
      <h3
        className="
          text-3xl
          font-bold
          tracking-tight
          text-black
        "
      >
        {banner.title}
      </h3>
    </div>
  );
}