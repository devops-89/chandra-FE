"use client";

import { useRouter } from "next/navigation";

import ServiceFilters from "./serviceList/ServiceFilters";
import ServicesTable from "./serviceList/ServicesTable";

const Services = () => {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Services
          </h1>

          <p className="text-slate-500">
            Manage categories and services
          </p>
        </div>

        <button
          onClick={() => router.push("/dashboard/admin/services/add")}
          className="rounded-xl bg-emerald-600 px-5 py-3 font-medium text-white hover:bg-emerald-700"
        >
          Add Service
        </button>
      </div>

      <ServiceFilters />

      <ServicesTable />
    </div>
  );
};

export default Services;