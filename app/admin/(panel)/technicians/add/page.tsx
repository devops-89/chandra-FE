import AdminAddTechnicianForm from '@/components/adminDashboard/technicians/add/AdminAddTechnicianForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add Technician | Admin Dashboard',
  description: 'Add a new technician to the system',
};

export default function AddTechnicianPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <AdminAddTechnicianForm />
    </div>
  );
}
