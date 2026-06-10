export interface Review {
  id: string;
  customerName: string;
  technicianName: string;
  serviceName: string;
  rating: number;
  comment: string;
  date: string;
  status: "Published" | "Hidden";
}

export const reviewsData: Review[] = [
  {
    id: "REV001",
    customerName: "Rahul Sharma",
    technicianName: "Arjun Sharma",
    serviceName: "AC Repair",
    rating: 5,
    comment: "Excellent service and very professional.",
    date: "15 Aug 2025",
    status: "Published",
  },
  {
    id: "REV002",
    customerName: "Priya Singh",
    technicianName: "Aman Verma",
    serviceName: "Deep Cleaning",
    rating: 4,
    comment: "Good service overall.",
    date: "14 Aug 2025",
    status: "Published",
  },
];