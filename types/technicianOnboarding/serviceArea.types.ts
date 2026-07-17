export interface ServiceAreaState {
  radius: number; // 0-5 representing km values
  pincodes: string[];
  latitude?: number;
  longitude?: number;
  fullAddress?: string;
  city?: string;
  state?: string;
  pincode?: string;
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

export interface PincodeMappingProps {
  pincodes: string[];
  onAddPincode: (pincode: string) => void;
  onRemovePincode: (pincode: string) => void;
}

export interface CoverageSummaryProps {
  radius: number;
  pincodesCount: number;
}

export interface ServiceAreaFooterProps {
  onPrevious: () => void;
  onSubmit: () => void;
}
