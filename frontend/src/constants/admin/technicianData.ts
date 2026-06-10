export interface Technician {
  id: string;
  name: string;
  avatar: string;
  experience: number;
  city: string;
  skills: string[];
  rating: number;
  completedJobs: number;
  status: "Active" | "Pending" | "Suspended";
}

export const techniciansData: Technician[] = [
  {
    id: "TECH001",
    name: "Arjun Sharma",
    avatar: "/images/technicians/arjun.jpg",
    experience: 8,
    city: "Noida",
    skills: ["Electrical", "EV Charger"],
    rating: 4.8,
    completedJobs: 326,
    status: "Pending",
  },
  {
    id: "TECH002",
    name: "Priya Das",
    avatar: "/images/technicians/priya.jpg",
    experience: 5,
    city: "Delhi",
    skills: ["AC Repair", "Deep Cleaning"],
    rating: 4.7,
    completedJobs: 210,
    status: "Active",
  },
];