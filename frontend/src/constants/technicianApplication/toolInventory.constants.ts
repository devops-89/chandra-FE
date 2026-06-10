import type { Equipment, VehicleOption } from '@/types/technicianApplication/toolInventory.types';

export const EQUIPMENT_LIST: Equipment[] = [
  {
    id: 'ladder-available',
    name: 'Ladder Available',
    description: 'Portable ladder for high-reach work',
    icon: 'stairs',
  },
  {
    id: 'ac-gauges-available',
    name: 'AC Gauges Available',
    description: 'Refrigerant gauges for AC servicing',
    icon: 'thermostat',
  },
  {
    id: 'safety-equipment-available',
    name: 'Safety Equipment Available',
    description: 'PPE and safety gear',
    icon: 'security',
  },
  {
    id: 'electrical-testing-tools',
    name: 'Electrical Testing Tools',
    description: 'Multimeter and testing equipment',
    icon: 'electrical_services',
  },
  {
    id: 'plumbing-tool-kit',
    name: 'Plumbing Tool Kit',
    description: 'Wrenches, pipes, and plumbing tools',
    icon: 'plumbing',
  },
];

export const VEHICLE_OPTIONS: VehicleOption[] = [
  {
    id: 'no-vehicle',
    name: 'No Vehicle',
    icon: 'close',
  },
  {
    id: 'two-wheeler',
    name: 'Two Wheeler',
    icon: 'two_wheeler',
  },
  {
    id: 'car',
    name: 'Car',
    icon: 'directions_car',
  },
  {
    id: 'commercial-van',
    name: 'Commercial Van',
    icon: 'local_shipping',
  },
];

export const TOOL_INVENTORY_TEXT = {
  header: {
    title: 'What tools do you have available?',
    description: 'Having the right tools helps us match you with better jobs and improves customer satisfaction.',
  },
  equipmentSection: 'Equipment Availability',
  vehicleSection: 'Vehicle Availability',
  additionalToolsLabel: 'Additional Equipment',
  additionalToolsPlaceholder: 'List any additional tools or equipment you have available...',
  infoBannerMessage: 'Technicians with complete tool inventory receive higher priority assignments.',
};
