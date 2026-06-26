'use client';

import DeleteServiceModal from '@/components/adminDashboard/services/manageService/DeleteServiceModal';
import EditServiceForm from '@/components/adminDashboard/services/manageService/EditServiceForm';
import { useServiceManager } from '@/hooks/useServiceManager';

import ServiceRow from './ServiceRow';

const ServicesTable = () => {
  const {
    services,
    editTarget,   openEdit,   closeEdit,   saveEdit,
    deleteTarget, openDelete, closeDelete, confirmDelete,
  } = useServiceManager();

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-slate-400 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-200">
            <thead>
              <tr className="bg-emerald-600 text-white text-left">
                <th className="p-4">Image</th>
                <th className="p-4">Service</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4">Bookings</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {services.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-16 text-center text-slate-400">
                    No services found.
                  </td>
                </tr>
              ) : (
                services.map((service) => (
                  <ServiceRow
                    key={service.id}
                    service={service}
                    onEdit={() => openEdit(service)}
                    onDelete={() => openDelete(service)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit drawer */}
      <EditServiceForm
        service={editTarget}
        onClose={closeEdit}
        onSave={saveEdit}
      />

      {/* Delete confirmation modal */}
      <DeleteServiceModal
        service={deleteTarget}
        onClose={closeDelete}
        onDelete={confirmDelete}
      />
    </>
  );
};

export default ServicesTable;
