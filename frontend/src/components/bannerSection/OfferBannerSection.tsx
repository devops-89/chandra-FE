import Grid from '@mui/material/Grid';

import { offerBanners } from '@/constants/banner/offerBannerData';

import { OfferBannerCard } from './OfferBannerCard';

export function OfferBannerSection() {
  return (
    <section
      id="offers"
      className="py-20"
    >
      <div className="mx-auto max-w-7xl px-4">
        <Grid container spacing={3}>
          {offerBanners.map((banner) => (
            <Grid
              key={banner.id}
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <OfferBannerCard banner={banner} />
            </Grid>
          ))}
        </Grid>
      </div>
    </section>
  );
}