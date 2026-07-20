import EditServicePageWrapper from "@/components/adminDashboard/services/editService/EditServicePageWrapper";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <EditServicePageWrapper serviceId={resolvedParams.id} />;
}
