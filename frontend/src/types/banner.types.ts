export interface OfferBanner {
  id: string | number;
  title: string;
  description?: string;
  image?: string;
}

export interface OfferBannerCardProps {
  banner: OfferBanner;
}
