import { notFound } from 'next/navigation';

import ServiceDetailPage from '@/components/serviceDetails';

import { homeCleaningData } from '@/constants/serviceDetails/homeCleaning';

const services = {
  'home-cleaning': homeCleaningData,
};

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ServicePage({
  params,
}: PageProps) {
  const { slug } = await params;

  const service = services[slug as keyof typeof services];

  if (!service) {
    notFound();
  }

  return <ServiceDetailPage service={service} />;
}