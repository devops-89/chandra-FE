import HeroContent from '@/components/heroSection/HeroContent';
import HeroDecorations from '@/components/heroSection/HeroDecorations';
import HeroImage from '@/components/heroSection/HeroImage';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#fff8ed] sm:py-20 py-16 lg:py-24 xl:py-28">
      <HeroDecorations />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20 lg:px-8 xl:max-w-350">
        <HeroContent />
        <HeroImage />
      </div>
    </section>
  );
};

export default HeroSection;
