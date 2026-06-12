import PublicFooter from '@/components/common/PublicFooter';
import PublicNavbar from '@/components/common/PublicNavbar';
import { ServiceSection } from '@/components/servicesSection/ServiceSection';

export default function ServicePage() {
  return (
    <>
      <PublicNavbar />
        <ServiceSection />
      <PublicFooter />
    </>
  );
}