import ServiceDetailsPageWrapper from "@/components/adminDashboard/services/details/ServiceDetailsPageWrapper";

export default async function ServiceDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  return <ServiceDetailsPageWrapper serviceId={Number(resolvedParams.id)} />;
}
