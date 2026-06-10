export interface Booking {
  id: string;
  customer: string;
  service: string;
  technician: string;
  amount: number;
  status:
    | "Pending"
    | "Assigned"
    | "In Progress"
    | "Completed"
    | "Cancelled";
  date: string;
}

export const bookingsData: Booking[] = [
  {
    id: "HC-1001",
    customer: "Rahul Sharma",
    service: "AC Repair",
    technician: "Arjun Sharma",
    amount: 499,
    status: "Assigned",
    date: "12 Aug 2025",
  },
  {
    id: "HC-1002",
    customer: "Priya Singh",
    service: "Pipe Leakage",
    technician: "-",
    amount: 299,
    status: "Pending",
    date: "13 Aug 2025",
  },
];