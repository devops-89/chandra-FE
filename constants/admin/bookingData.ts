export interface Booking {
  id: string;
  customer: string;
  service: string;
  technician: string;
  amount: number;
  status:
    | 'Pending'
    | 'Assigned'
    | 'In Progress'
    | 'Completed'
    | 'Cancelled';
  date: string;
}

export const bookingsData: Booking[] = [
  {
    id: 'HC-1001',
    customer: 'Rahul Sharma',
    service: 'AC Repair',
    technician: 'Arjun Sharma',
    amount: 499,
    status: 'Assigned',
    date: '12 Aug 2025',
  },
  {
    id: 'HC-1002',
    customer: 'Priya Singh',
    service: 'Pipe Leakage',
    technician: '-',
    amount: 299,
    status: 'Pending',
    date: '13 Aug 2025',
  },
  {
    id: 'HC-1003',
    customer: 'Ankit Verma',
    service: 'Electrical Wiring',
    technician: 'Vikram Singh',
    amount: 799,
    status: 'In Progress',
    date: '14 Aug 2025',
  },
  {
    id: 'HC-1004',
    customer: 'Sunita Gupta',
    service: 'Deep Cleaning',
    technician: 'Priya Das',
    amount: 649,
    status: 'Completed',
    date: '10 Aug 2025',
  },
  {
    id: 'HC-1005',
    customer: 'Manoj Tiwari',
    service: 'Water Purifier',
    technician: '-',
    amount: 349,
    status: 'Pending',
    date: '15 Aug 2025',
  },
  {
    id: 'HC-1006',
    customer: 'Kavya Nair',
    service: 'Solar Panel Cleaning',
    technician: 'Priya Das',
    amount: 899,
    status: 'Completed',
    date: '09 Aug 2025',
  },
  {
    id: 'HC-1007',
    customer: 'Rohit Mishra',
    service: 'Home Automation',
    technician: 'Vikram Singh',
    amount: 1299,
    status: 'Assigned',
    date: '16 Aug 2025',
  },
  {
    id: 'HC-1008',
    customer: 'Deepa Rao',
    service: 'AC Installation',
    technician: '-',
    amount: 1499,
    status: 'Pending',
    date: '16 Aug 2025',
  },
  {
    id: 'HC-1009',
    customer: 'Sanjay Dubey',
    service: 'Geyser Repair',
    technician: '-',
    amount: 449,
    status: 'Pending',
    date: '17 Aug 2025',
  },
  {
    id: 'HC-1010',
    customer: 'Pooja Reddy',
    service: 'Pest Control',
    technician: 'Priya Das',
    amount: 599,
    status: 'In Progress',
    date: '17 Aug 2025',
  },
];