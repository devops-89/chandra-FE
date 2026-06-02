import { heroContent } from '@/constants/hero/heroContent';
import HeroContentAnimated from './HeroContentAnimated';

const HeroContent = () => {
  const { cta, description, heading, label, headingHighlight } = heroContent;

  return (
    <HeroContentAnimated
      label={label}
      heading={heading}
      headingHighlight={headingHighlight}
      description={description}
      cta={cta}
    />
  );
};

export default HeroContent;
