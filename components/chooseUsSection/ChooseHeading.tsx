import { ChooseHeadingAnimated } from '@/components/chooseUsSection/ChooseHeadingAnimated';
import { ChooseUs } from '@/constants/chooseUs/ChooseUs';

export function ChooseHeading() {
  return (
    <ChooseHeadingAnimated
      paragraph={ChooseUs.paragraph}
      heading={ChooseUs.heading}
    />
  );
}