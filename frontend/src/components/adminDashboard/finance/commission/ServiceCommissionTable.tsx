"use client";

import { useState } from "react";

import EditCommissionPage from "./EditCommissionPage";

const initialServices = [
  {
    name: "AC Repair",
    commission: 15,
  },
  {
    name: "Plumbing",
    commission: 12,
  },
  {
    name: "Solar Cleaning",
    commission: 18,
  },
];

const ServiceCommissionTable = () => {
  const [services, setServices] = useState(initialServices);

  const [selectedService, setSelectedService] =
    useState<(typeof initialServices)[0] | null>(null);

  const [openModal, setOpenModal] = useState(false);

  const handleUpdateCommission = (
    newCommission: number
  ) => {
    setServices((prev) =>
      prev.map((service) =>
        service.name === selectedService?.name
          ? {
              ...service,
              commission: newCommission,
            }
          : service
      )
    );

    setOpenModal(false);
  };

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-slate-400 bg-white">
        <div className="border-b p-5">
          <h3 className="font-semibold">
            Service Commission Settings
          </h3>
        </div>

        <table className="w-full">
          <thead className="bg-emerald-600 text-white">
            <tr>
              <th className="p-4 text-left">
                Service
              </th>

              <th className="p-4 text-left">
                Commission
              </th>

              <th className="p-4 text-left">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {services.map((service) => (
              <tr key={service.name}>
                <td className="p-4">
                  {service.name}
                </td>

                <td className="p-4">
                  {service.commission}%
                </td>

                <td className="p-4">
                  <button
                    onClick={() => {
                      setSelectedService(service);
                      setOpenModal(true);
                    }}
                    className="cursor-pointer text-emerald-600 hover:underline"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditCommissionPage
        open={openModal}
        onClose={() => setOpenModal(false)}
        service={selectedService}
        onSave={handleUpdateCommission}
      />
    </>
  );
};

export default ServiceCommissionTable;