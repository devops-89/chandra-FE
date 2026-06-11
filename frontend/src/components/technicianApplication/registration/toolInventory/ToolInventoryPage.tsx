'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import type { ToolInventoryState } from '@/types/technicianApplication/toolInventory.types';

import AdditionalEquipmentInput from './AdditionalEquipmentInput';
import EquipmentChecklist from './EquipmentChecklist';
import ToolInventoryFooter from './ToolInventoryFooter';
import ToolInventoryHeader from './ToolInventoryHeader';
import ToolInventoryInfoBanner from './ToolInventoryInfoBanner';
import VehicleAvailabilityCard from './VehicleAvailabilityCard';

export default function ToolInventoryPage() {
  const router = useRouter();
  const [state, setState] = useState<ToolInventoryState>({
    availableEquipment: [],
    vehicle: null,
    additionalTools: '',
  });

  const handleToggleEquipment = (equipmentId: string) => {
    setState((prev) => ({
      ...prev,
      availableEquipment: prev.availableEquipment.includes(equipmentId)
        ? prev.availableEquipment.filter((id) => id !== equipmentId)
        : [...prev.availableEquipment, equipmentId],
    }));
  };

  const handleSelectVehicle = (vehicleId: string) => {
    setState((prev) => ({
      ...prev,
      vehicle: prev.vehicle === vehicleId ? null : vehicleId,
    }));
  };

  const handleAdditionalToolsChange = (value: string) => {
    setState((prev) => ({
      ...prev,
      additionalTools: value,
    }));
  };

  const isComplete = state.vehicle !== null;

  const handlePrevious = () => {
    router.push('/technicianOnboarding/document-upload');
  };

  const handleSubmit = () => {
    // Save state to session storage for later use
    sessionStorage.setItem('toolInventoryData', JSON.stringify(state));
    router.push('/technicianOnboarding/service-area');
  };

  return (
    <div className="space-y-8">
      <ToolInventoryHeader />

      <EquipmentChecklist
        selectedEquipment={state.availableEquipment}
        onToggleEquipment={handleToggleEquipment}
      />

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Vehicle Availability
        </h2>
        <VehicleAvailabilityCard
          selected={state.vehicle}
          onSelect={handleSelectVehicle}
        />
      </div>

      <AdditionalEquipmentInput
        value={state.additionalTools}
        onChange={handleAdditionalToolsChange}
      />

      <ToolInventoryInfoBanner />

      <ToolInventoryFooter
        onPrevious={handlePrevious}
        onSubmit={handleSubmit}
        isComplete={isComplete}
      />
    </div>
  );
}
