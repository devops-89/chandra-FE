import ApprovalQueue from '@/components/adminDashboard/dashboard/technicianApprovals/ApprovalQueue';

import TechnicianFilters from "./list/TechnicianFilters";
import TechniciansTable from "./list/TechniciansTable";


const Technicians = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Technicians
        </h1>

        <p className="text-slate-500">
          Manage technicians and approvals
        </p>
      </div>

      <TechnicianFilters />

      <ApprovalQueue />

      <TechniciansTable />
    </div>
  );
};

export default Technicians;