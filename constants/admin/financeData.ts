export interface Transaction {
  id: string;
  bookingId: string;
  customer: string;
  amount: number;
  method: string;
  status: "Success" | "Pending" | "Failed";
  date: string;
}

export interface Payout {
  id: string;
  technician: string;
  amount: number;
  status: "Pending" | "Released";
  date: string;
}

export const transactionsData: Transaction[] = [
  {
    id: "TXN001",
    bookingId: "HC1001",
    customer: "Rahul Sharma",
    amount: 499,
    method: "UPI",
    status: "Success",
    date: "12 Aug 2025",
  },
  {
    id: "TXN002",
    bookingId: "HC1002",
    customer: "Priya Singh",
    amount: 899,
    method: "Card",
    status: "Pending",
    date: "13 Aug 2025",
  },
];

export const payoutsData: Payout[] = [
  {
    id: "PAY001",
    technician: "Arjun Sharma",
    amount: 12500,
    status: "Pending",
    date: "15 Aug 2025",
  },
];