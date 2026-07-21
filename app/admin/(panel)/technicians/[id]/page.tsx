import TechnicianDetailsPageWrapper from '@/components/adminDashboard/technicians/details/TechnicianDetailsPageWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Technician Details | Admin Dashboard',
  description: 'View technician details and profile',
};

export default async function TechnicianDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <TechnicianDetailsPageWrapper technicianId={resolvedParams.id} />;
}
