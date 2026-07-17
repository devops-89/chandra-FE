'use client';

import { useState } from 'react';

import ServiceCoverageMap from '@/components/technicianApplication/serviceArea/ServiceCoverageMap';
import { getAreaKm } from '@/data/technicianOnboarding/serviceAreaData';
import type { ServiceAreaState } from '@/types/technicianOnboarding/serviceArea.types';

import AreaSelector from './AreaSelector';
import CoverageSummary from './CoverageSummary';
import { useServiceArea } from './hooks/useServiceArea';
import PincodeMapping from './PincodeMapping';
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
    addPincode,
    removePincode,
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
      (position) => {
        setServiceLocation({
          city: undefined,
          fullAddress: undefined,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          pincode: undefined,
          state: undefined,
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
        </section>

        <PincodeMapping
          pincodes={state.pincodes}
          onAddPincode={addPincode}
          onRemovePincode={removePincode}
        />

        <ServiceAreaFooter
          onPrevious={onPrevious}
          onSubmit={handleSubmit}
        />
      </div>

      {/* Sticky Summary Sidebar */}
      <div className="hidden lg:block">
        <CoverageSummary
          radius={state.radius}
          pincodesCount={state.pincodes.length}
        />
      </div>

      {/* Mobile Summary (below content) */}
      <div className="lg:hidden">
        <CoverageSummary
          radius={state.radius}
          pincodesCount={state.pincodes.length}
        />
      </div>
    </div>
  );
}
