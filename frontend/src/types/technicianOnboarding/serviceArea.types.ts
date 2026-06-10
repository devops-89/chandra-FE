export interface ServiceAreaState {
  radius: number; // 0-5 representing km values
  preferredAreas: string[];
  pincodes: string[];
}

export interface AreaOption {
  value: number;
  label: string;
  km: number;
}

export interface ServiceAreaHeaderProps {
  title?: string;
  description?: string;
}

export interface AreaSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export interface PreferredAreasInputProps {
  selectedAreas: string[];
  onAddArea: (area: string) => void;
  onRemoveArea: (area: string) => void;
}

export interface PincodeMappingProps {
  pincodes: string[];
  onAddPincode: (pincode: string) => void;
  onRemovePincode: (pincode: string) => void;
}

export interface CoverageSummaryProps {
  radius: number;
  areasCount: number;
  pincodesCount: number;
}

export interface ServiceAreaFooterProps {
  onPrevious: () => void;
  onSubmit: () => void;
}
