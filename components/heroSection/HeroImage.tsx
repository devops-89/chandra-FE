import { heroContent } from '@/constants/hero/heroContent';

import HeroImageAnimated from './HeroImageAnimated';

const HeroImage = () => {
  const { image } = heroContent;

  return <HeroImageAnimated image={image} />;
};

export default HeroImage;
