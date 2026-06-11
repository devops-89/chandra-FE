import { servicesData } from "@/constants/admin/serviceData";

import ServiceRow from "./ServiceRow";

const ServicesTable = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-400 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="bg-emerald-600 text-white text-left">
              <th className="p-4">Image</th>
              <th className="p-4">Service</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Status</th>
              <th className="p-4">Bookings</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {servicesData.map((service) => (
              <ServiceRow key={service.id} service={service} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServicesTable;
