import HeroContent from '@/components/heroSection/HeroContent';
import HeroDecorations from '@/components/heroSection/HeroDecorations';
import HeroImage from '@/components/heroSection/HeroImage';

const HeroSection = () => {
  return (
    <section 
    id="home"
    className="relative overflow-hidden bg-[#fff8ed] py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 2xl:py-26">
      <HeroDecorations />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:gap-12 sm:px-6 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 xl:max-w-350 xl:gap-20 2xl:max-w-7xl">
        <HeroContent />
        <HeroImage />
      </div>
    </section>
  );
};

export default HeroSection;
