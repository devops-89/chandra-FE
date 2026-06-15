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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6">
          {services.map((service) => (
            <div
              key={service.name}
              className="border border-slate-200 rounded-2xl bg-white p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between cursor-default"
            >
              <div>
                <h4 className="font-semibold text-slate-900 leading-snug">
                  {service.name}
                </h4>
                <div className="mt-4">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Commission Rate</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{service.commission}%</p>
                </div>
              </div>

              <div className="flex justify-end mt-4 pt-3 border-t border-slate-100">
                <button
                  onClick={() => {
                    setSelectedService(service);
                    setOpenModal(true);
                  }}
                  className="cursor-pointer text-emerald-600 hover:text-emerald-700 font-medium text-sm hover:underline"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
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