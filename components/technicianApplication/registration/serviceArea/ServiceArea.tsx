'use client';

import { useState } from 'react';

import ServiceCoverageMap from '@/components/technicianApplication/serviceArea/ServiceCoverageMap';
import { getAreaKm } from '@/data/technicianOnboarding/serviceAreaData';
import type { ServiceAreaState } from '@/types/technicianOnboarding/serviceArea.types';

import AreaSelector from './AreaSelector';
import CoverageSummary from './CoverageSummary';
import { useServiceArea } from './hooks/useServiceArea';
import ServiceAreaFooter from './ServiceAreaFooter';
import ServiceAreaHeader from './ServiceAreaHeader';

interface ServiceAreaProps {
  onPrevious: () => void;
  onSubmit: (data: ServiceAreaState) => void;
}

export default function ServiceArea({
  onPrevious,
  onSubmit,
}: ServiceAreaProps) {
  const {
    state,
    setRadius,
    setServiceLocation,
  } = useServiceArea();
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const radiusKm = getAreaKm(state.radius);
  const latitude = state.latitude;
  const longitude = state.longitude;
  const hasLocation =
    typeof latitude === 'number'
    && typeof longitude === 'number';

  const handleSubmit = () => {
    sessionStorage.setItem('serviceAreaData', JSON.stringify(state));
    onSubmit(state);
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        let city = '';
        let stateName = '';
        let pin = '';
        let address = '';

        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
          if (response.ok) {
            const data = await response.json();
            if (data.address) {
              city = data.address.city || data.address.town || data.address.village || '';
              stateName = data.address.state || '';
              pin = data.address.postcode || '';
              address = data.display_name || '';
            }
          }
        } catch (err) {
           console.error('Geocoding failed:', err);
        }

        setServiceLocation({
          city: city || undefined,
          fullAddress: address || undefined,
          latitude: lat,
          longitude: lng,
          pincode: pin || undefined,
          state: stateName || undefined,
        });
        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);

        if (error.code === error.PERMISSION_DENIED) {
          setLocationError('Location permission denied. Please allow access.');
          return;
        }

        if (error.code === error.POSITION_UNAVAILABLE) {
          setLocationError('Location information is unavailable.');
          return;
        }

        if (error.code === error.TIMEOUT) {
          setLocationError('Location request timed out.');
          return;
        }

        setLocationError('Unable to retrieve your location.');
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        <ServiceAreaHeader />

        <AreaSelector value={state.radius} onChange={setRadius} />

        <section className="rounded-xl border border-surface-container-low bg-surface-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-bold text-emerald-deep">Service Location</h3>
            <button
              type="button"
              onClick={handleUseCurrentLocation}
              disabled={isLocating}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
            >
              <span className="material-symbols-outlined text-lg">my_location</span>
              {isLocating ? 'Locating...' : 'Use Current Location'}
            </button>
          </div>

          {locationError && (
            <p className="mb-4 flex items-center gap-2 text-sm font-medium text-red-600">
              <span className="material-symbols-outlined text-base">error</span>
              {locationError}
            </p>
          )}

          <div className="h-72 overflow-hidden rounded-lg border border-slate-200">
            {hasLocation ? (
              <ServiceCoverageMap
                latitude={latitude}
                longitude={longitude}
                radiusKm={radiusKm}
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-slate-100 px-4 text-center text-sm font-semibold text-slate-500">
                Please select your service location to preview coverage.
              </div>
            )}
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wider">
                Street Address
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Flat/House No, Building, Area, Street Address"
                value={state.fullAddress || ''}
                onChange={(e) => setServiceLocation({ fullAddress: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wider">
                  City
                </label>
                <input
                  type="text"
                  placeholder="e.g. Gurgaon"
                  value={state.city || ''}
                  onChange={(e) => setServiceLocation({ city: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wider">
                  State
                </label>
                <input
                  type="text"
                  placeholder="e.g. Haryana"
                  value={state.state || ''}
                  onChange={(e) => setServiceLocation({ state: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wider">
                Pincode
              </label>
              <input
                type="text"
                maxLength={6}
                placeholder="e.g. 122001"
                value={state.pincode || ''}
                onChange={(e) => setServiceLocation({ pincode: e.target.value.replace(/\D/g, '') })}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
              />
            </div>
          </div>
        </section>

        <ServiceAreaFooter
          onPrevious={onPrevious}
          onSubmit={handleSubmit}
        />
      </div>

      {/* Sticky Summary Sidebar */}
      <div className="hidden lg:block">
        <CoverageSummary radius={state.radius} />
      </div>

      {/* Mobile Summary (below content) */}
      <div className="lg:hidden">
        <CoverageSummary radius={state.radius} />
      </div>
    </div>
  );
}
