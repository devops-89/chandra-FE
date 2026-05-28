import HeroContent from '@/components/common/hero/HeroContent';
import HeroDecorations from '@/components/common/hero/HeroDecorations';
import HeroImage from '@/components/common/hero/HeroImage';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#fff8ed] py-20 sm:py-24 lg:py-28">
      <HeroDecorations />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-8">
        <HeroContent />
        <HeroImage />
      </div>
    </section>
  );
};

export default HeroSection;
