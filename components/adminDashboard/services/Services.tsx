"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchServices } from "@/redux/slices/servicesSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ServiceFilters from "./serviceList/ServiceFilters";
import ServicesTable from "./serviceList/ServicesTable";

const Services = () => {
  const router   = useRouter();
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector((state) => state.services.isLoading);
  const error     = useAppSelector((state) => state.services.error);

  // Dispatch fetch every time this page mounts so a page refresh
  // always pulls the latest data from the backend.
  useEffect(() => {
    dispatch(fetchServices());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Services
          </h1>
          <p className="text-slate-500">Manage categories and services</p>
        </div>

        <button
          type="button"
          onClick={() => router.push("/dashboard/admin/services/add")}
          className="rounded-xl bg-emerald-600 cursor-pointer px-5 py-3 font-medium text-white hover:bg-emerald-700 transition-colors self-start sm:self-auto"
        >
          Create Service
        </button>
      </div>

      <ServiceFilters />

      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />
          <span className="ml-3 text-sm text-slate-500">Loading services…</span>
        </div>
      )}

      {/* Error state */}
      {!isLoading && error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-5">
          <p className="text-sm font-medium text-red-700">{error}</p>
          <button
            type="button"
            onClick={() => dispatch(fetchServices())}
            className="mt-3 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Table — only rendered once loading is done and there is no error */}
      {!isLoading && !error && <ServicesTable />}
    </div>
  );
};

export default Services;
