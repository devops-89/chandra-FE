'use client';

import { getEquipmentList } from '@/data/technicianOnboarding/toolInventoryData';

import EquipmentCard from './EquipmentCard';

interface EquipmentChecklistProps {
  selectedEquipment: string[];
  onToggleEquipment: (equipmentId: string) => void;
}

export default function EquipmentChecklist({
  selectedEquipment,
  onToggleEquipment,
}: EquipmentChecklistProps) {
  const equipmentList = getEquipmentList();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">
        Equipment Availability
      </h2>
      <div className="space-y-3">
        {equipmentList.map((equipment) => (
          <EquipmentCard
            key={equipment.id}
            equipment={equipment}
            isSelected={selectedEquipment.includes(equipment.id)}
            onToggle={onToggleEquipment}
          />
        ))}
      </div>
    </div>
  );
}
