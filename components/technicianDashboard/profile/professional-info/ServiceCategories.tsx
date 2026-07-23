'use client';

import { useAppSelector } from '@/redux/hooks';

export default function ServiceCategories() {
  const technician = useAppSelector((state) => state.technicianProfile.profile);
  const profile = technician?.technicianProfile;

  const services = profile?.services?.map((s) => s.service?.name).filter(Boolean) || [];
  const brands = profile?.brandExpertise?.map((b) => b.brandName).filter(Boolean) || [];

  return (
    <div>
      <h4
        className="
          text-sm
          text-slate-500
          mb-4
        "
      >
        Service Categories
      </h4>

      <div className="space-y-3">
        {services.length > 0 ? services.map((category) => (
          <div
            key={category}
            className="flex items-center justify-between p-3 rounded-2xl bg-slate-50"
          >
            <span className="font-medium">{category}</span>
            <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">
              Active
            </span>
          </div>
        )) : <p className="text-sm text-slate-500">No services available.</p>}
      </div>

      <h4 className="text-sm text-slate-500 mb-4 mt-6">
        Brand Expertise
      </h4>

      <div className="flex flex-wrap gap-3">
        {brands.length > 0 ? brands.map((brand) => (
          <span
            key={brand}
            className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium"
          >
            {brand}
          </span>
        )) : <p className="text-sm text-slate-500">No brands available.</p>}
      </div>
    </div>
  );
}