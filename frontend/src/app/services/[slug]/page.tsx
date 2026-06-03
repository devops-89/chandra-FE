import { notFound } from 'next/navigation';

import ServiceDetailPage from '@/components/serviceDetails/ServiceDetailPage';
import { acServicingData } from '@/constants/serviceDetails/acServicing';
import { electricalData } from '@/constants/serviceDetails/electrical';
import { homeCleaningData } from '@/constants/serviceDetails/homeCleaning';
import { plumbingData } from '@/constants/serviceDetails/plumbing';

const services = {
  'home-cleaning': homeCleaningData,
  plumbing: plumbingData,
  electrical: electricalData,
  'ac-servicing': acServicingData,
};

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return [
    { slug: 'home-cleaning' },
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