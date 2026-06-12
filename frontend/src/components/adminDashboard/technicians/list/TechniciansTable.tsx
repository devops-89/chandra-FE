import { techniciansData } from "@/constants/admin/technicianData";

import TechnicianRow from "./TechnicianRow";

const TechniciansTable = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-400 bg-white">
      <div className="overflow-x-auto">
        <div className="border-b border-slate-400 p-5">
          <h1 className="font-semibold">Current Technicians</h1>
        </div>
        
        <table className="w-full min-width:640px">
          <thead className="bg-emerald-600 text-white">
            <tr>
              <th className="p-4 text-left">Technician</th>
              <th className="p-4 text-left">Experience</th>
              <th className="p-4 text-left">Rating</th>
              <th className="p-4 text-left">Jobs</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {techniciansData.map((technician) => (
              <TechnicianRow key={technician.id} technician={technician} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TechniciansTable;
