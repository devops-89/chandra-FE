import { notFound } from 'next/navigation';

import ServiceDetailPage from '@/components/serviceDetails/ServiceDetailPage';
import { acServicingData } from '@/constants/serviceDetails/acServicing';
import { electricalData } from '@/constants/serviceDetails/electrical';
import { plumbingData } from '@/constants/serviceDetails/plumbing';
import { solarCleaningData } from '@/constants/serviceDetails/solarCleaning';

const services = {
  'solar-cleaning': solarCleaningData,
  'plumbing': plumbingData,
  'electrical': electricalData,
  'ac-servicing': acServicingData,
};

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return [
    { slug: 'solar-cleaning' },
    { slug: 'plumbing' },
    { slug: 'electrical' },
    { slug: 'ac-servicing' },
  ];
}

export default async function ServicePage({
  params,
}: PageProps) {
  const { slug } = await params;

  const service =
    services[slug as keyof typeof services];

  if (!service) {
    notFound();
  }

  return (
    <ServiceDetailPage
      service={service}
    />
  );
}