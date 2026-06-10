export interface Equipment {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface VehicleOption {
  id: string;
  name: string;
  icon: string;
}

export interface ToolInventoryState {
  availableEquipment: string[];
  vehicle: string | null;
  additionalTools: string;
}

export interface EquipmentCardProps {
  equipment: Equipment;
  isSelected: boolean;
  onToggle: (equipmentId: string) => void;
}

export interface VehicleAvailabilityCardProps {
  selected: string | null;
  onSelect: (vehicleId: string) => void;
}

export interface AdditionalEquipmentInputProps {
  value: string;
  onChange: (value: string) => void;
}

export interface ToolInventoryHeaderProps {
  title?: string;
  description?: string;
}

export interface ToolInventoryFooterProps {
  onPrevious: () => void;
  onSubmit: () => void;
  isComplete?: boolean;
}

export interface ToolInventoryInfoBannerProps {
  message?: string;
}
