import { notFound } from 'next/navigation';

import PublicFooter from '@/components/common/PublicFooter';
import PublicNavbar from '@/components/common/PublicNavbar';
import DynamicServiceDetailPage from '@/components/serviceDetails/DynamicServiceDetailPage';
import { servicesData } from '@/constants/services/serviceData';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServicePage({
  params,
}: PageProps) {
  const { slug } = await params;

  const service = servicesData.find(s => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <PublicNavbar />
      <main className="min-h-screen">
        <DynamicServiceDetailPage service={service} />
      </main>
      <PublicFooter />
    </>
  );
}