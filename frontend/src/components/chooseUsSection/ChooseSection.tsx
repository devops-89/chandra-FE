import Grid from '@mui/material/Grid';

import { ChooseBenefitsAnimated } from '@/components/chooseUsSection/ChooseBenefitsAnimated';
import { ChooseCTAAnimated } from '@/components/chooseUsSection/ChooseCTAAnimated';
import { ChooseHeading } from '@/components/chooseUsSection/ChooseHeading';
import { ChooseImageAnimated } from '@/components/chooseUsSection/ChooseImageAnimated';
import HeroDecorations from '@/components/heroSection/HeroDecorations';

export function ChooseSection() {
  return (
    <section className="relative overflow-hidden bg-[#fff8ed] py-24">
      <HeroDecorations />

      <div className="relative mx-auto max-w-7xl px-4">
        <ChooseHeading />

        <Grid
          container
          spacing={8}
            className="mt-16"
        >
          <Grid size={{ xs: 12, lg: 7 }}>
            <ChooseImageAnimated />
          </Grid>

          <Grid size={{ xs: 12, lg: 5 }}>
            <div className="space-y-10">
              <ChooseBenefitsAnimated />
              <ChooseCTAAnimated />
            </div>
          </Grid>
        </Grid>
      </div>
    </section>
  );
}