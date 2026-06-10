export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  totalBookings: number;
  totalSpent: number;
  status: "Active" | "Blocked";
}

export const customersData: Customer[] = [
  {
    id: "CUS001",
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    phone: "+91 9876543210",
    city: "Noida",
    totalBookings: 18,
    totalSpent: 8450,
    status: "Active",
  },
  {
    id: "CUS002",
    name: "Priya Singh",
    email: "priya@gmail.com",
    phone: "+91 9988776655",
    city: "Delhi",
    totalBookings: 8,
    totalSpent: 3200,
    status: "Active",
  },
];