export interface CommissionHistory {
  id: string;
  serviceName: string;
  oldCommission: number;
  newCommission: number;
  updatedBy: string;
  updatedAt: string;
}

export const commissionHistoryData: CommissionHistory[] = [
  {
    id: "COM001",
    serviceName: "AC Repair",
    oldCommission: 12,
    newCommission: 15,
    updatedBy: "Admin",
    updatedAt: "12 Aug 2025, 10:30 AM",
  },
  {
    id: "COM002",
    serviceName: "Solar Cleaning",
    oldCommission: 15,
    newCommission: 18,
    updatedBy: "Admin",
    updatedAt: "14 Aug 2025, 04:15 PM",
  },
];