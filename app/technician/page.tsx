import PublicFooter from '@/components/common/PublicFooter';
import PublicNavbar from '@/components/common/PublicNavbar';
import {
  BenefitsSection,
  CategoriesSection,
  CTASection,
  FAQSection,
  HowItWorksSection,
  RequirementsSection,
  TechnicianHero,
  TestimonialsSection,
  WhyJoinSection,
} from '@/components/technicianLanding';

export const metadata = {
  title: 'Join as a Technician — HiChandra',
  description:
    'Build your service business with HiChandra. Higher earnings, weekly payouts, flexible schedule, and verified customers.',
};

export default function TechnicianLandingPage() {
  return (
    <>
      <PublicNavbar />
      <main>
        <TechnicianHero />
        <WhyJoinSection />
        <HowItWorksSection />
        <BenefitsSection />
        <CategoriesSection />
        <RequirementsSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <PublicFooter />
    </>
  );
}
