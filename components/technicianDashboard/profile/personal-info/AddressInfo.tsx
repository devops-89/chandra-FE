'use client';

import { CheckCircle,LocationOn } from '@mui/icons-material';

import { useAppSelector } from '@/redux/hooks';

export default function AddressInfo() {
  const technician = useAppSelector((state) => state.technicianProfile.profile);
  const locations = technician?.technicianProfile?.locations || [];

  return (
    <div>
      <div className="flex gap-4">
        <LocationOn className="text-emerald-500" />

        <div className="flex-1">
          <p className="text-sm text-slate-500 mb-3">
            Service Addresses
          </p>

          {locations.length > 0 ? (
            <div className="space-y-4">
              {locations.map((loc: any) => (
                <div key={loc.id} className={`p-4 rounded-xl border relative ${loc.isDefault ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-100 bg-slate-50'}`}>
                  {loc.isDefault && (
                    <span className="absolute top-4 right-4 flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full uppercase tracking-wider">
                      <CheckCircle fontSize="inherit" /> Active
                    </span>
                  )}
                  <p className="font-semibold text-slate-900 pr-20">
                    {loc.city}, {loc.state}, India
                  </p>
                  <p className="mt-1.5 text-sm text-slate-600">
                    {loc.fullAddress}
                  </p>
                  <p className="mt-2 text-xs font-medium text-slate-500 flex items-center gap-3">
                    <span>Pincode: {loc.pincode}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span>Radius: {loc.serviceRadiusKm} km</span>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 font-medium">No address provided</p>
          )}
        </div>
      </div>
    </div>
  );
}