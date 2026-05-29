import Grid from '@mui/material/Grid';

import HeroDecorations from '@/components/heroSection/HeroDecorations';

import { ChooseHeading } from '@/components/chooseUsSection/ChooseHeading';
import { ChooseImage } from '@/components/chooseUsSection/ChooseImage';
import { ChooseBenefits } from '@/components/chooseUsSection/ChooseBenefits';
import { ChooseCTA } from '@/components/chooseUsSection/ChooseCTA';

export function ChooseSection() {
  return (
    <section className="relative overflow-hidden bg-[#fff8ed] py-24">
      <HeroDecorations />

      <div className="relative mx-auto gap-5 max-w-7xl px-4">
        <ChooseHeading />

        <Grid
          container
          spacing={6}
            className="mt-12"
        >
          <Grid size={{ xs: 12, lg: 7 }}>
            <ChooseImage />
          </Grid>

          <Grid size={{ xs: 12, lg: 5 }}>
            <div className="space-y-10">
              <ChooseBenefits />
              <ChooseCTA />
            </div>
          </Grid>
        </Grid>
      </div>
    </section>
  );
}