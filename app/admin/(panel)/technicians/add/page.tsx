import type { Metadata } from 'next';

import AdminAddTechnicianForm from '@/components/adminDashboard/technicians/add/AdminAddTechnicianForm';

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
