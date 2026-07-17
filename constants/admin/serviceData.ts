export interface Service {
  id: string;
  image: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  duration: string;
  status: "Active" | "Inactive";
  bookings: number;
}

export const servicesData: Service[] = [
  {
    id: "SER001",
    image: "/images/services/ac-repair.jpg",
    name: "AC Repair",
    category: "Appliance Repair",
    subcategory: "Air Conditioner",
    price: 499,
    duration: "1 Hour",
    status: "Active",
    bookings: 154,
  },
  {
    id: "SER002",
    image: "/images/services/plumbing.jpg",
    name: "Pipe Leakage Repair",
    category: "Plumbing",
    subcategory: "Leakage",
    price: 299,
    duration: "45 Mins",
    status: "Active",
    bookings: 92,
  },
];