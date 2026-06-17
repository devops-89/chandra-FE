"use client";

import { useRouter } from "next/navigation";

import ServiceFilters from "./serviceList/ServiceFilters";
import ServicesTable from "./serviceList/ServicesTable";

const Services = () => {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Services
          </h1>
          <p className="text-slate-500">Manage categories and services</p>
        </div>

        <button
          onClick={() => router.push("/dashboard/admin/services/add")}
          className="rounded-xl bg-emerald-600 cursor-pointer px-5 py-3 font-medium text-white hover:bg-emerald-700 transition-colors self-start sm:self-auto"
        >
          Create Service
        </button>
      </div>

      <ServiceFilters />
      <ServicesTable />
    </div>
  );
};

export default Services;
