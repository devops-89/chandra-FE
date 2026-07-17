export interface Address {
  id: string;
  label: string;
  address: string;
  isDefault: boolean;
}

export interface Props {
  address: Address;

  onEdit?: (address: Address) => void;

  onDelete?: (address: Address) => void;
}