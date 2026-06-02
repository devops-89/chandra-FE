import { ChooseUs } from '@/constants/chooseUs/ChooseUs';
import { ChooseHeadingAnimated } from '@/components/chooseUsSection/ChooseHeadingAnimated';

export function ChooseHeading() {
  return (
    <ChooseHeadingAnimated
      paragraph={ChooseUs.paragraph}
      heading={ChooseUs.heading}
    />
  );
}