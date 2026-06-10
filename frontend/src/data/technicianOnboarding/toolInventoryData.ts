import { EQUIPMENT_LIST, VEHICLE_OPTIONS } from '@/constants/technicianApplication/toolInventory.constants';
import type { Equipment, VehicleOption } from '@/types/technicianApplication/toolInventory.types';

export const getEquipmentList = (): Equipment[] => {
  return EQUIPMENT_LIST;
};

export const getVehicleOptions = (): VehicleOption[] => {
  return VEHICLE_OPTIONS;
};

export const getEquipmentById = (id: string): Equipment | undefined => {
  return EQUIPMENT_LIST.find((eq) => eq.id === id);
};

export const getVehicleById = (id: string): VehicleOption | undefined => {
  return VEHICLE_OPTIONS.find((v) => v.id === id);
};
