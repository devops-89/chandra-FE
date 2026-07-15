export interface VerificationDocument {
  name: string;
  type: string;
  status: "PENDING_APPROVAL" | "APPROVED" | "REJECTED";
  url: string;
}

export interface Technician {
  id: string;
  name: string;
  avatar: string;
  experience: number;
  city: string;
  skills: string[];
  rating: number;
  completedJobs: number;
  status: "APPROVED" | "PENDING_APPROVAL" | "REJECTED";
  email: string;
  phone: string;
  appliedAt: string;
  documents: VerificationDocument[];
  rejectionReason?: string;
  rejectionNotes?: string;
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
    status: "PENDING_APPROVAL",
    email: "arjun.sharma@example.com",
    phone: "+91 98765 43210",
    appliedAt: "2026-06-12",
    documents: [
      { name: "Aadhaar Card", type: "Identity Proof", status: "PENDING_APPROVAL", url: "/docs/aadhaar_arjun.pdf" },
      { name: "PAN Card", type: "Tax ID", status: "PENDING_APPROVAL", url: "/docs/pan_arjun.pdf" },
      { name: "Electrical Trade License", type: "Certification", status: "PENDING_APPROVAL", url: "/docs/license_arjun.pdf" }
    ]
  },
  {
    id: "TECH002",
    name: "Priya Das",
    avatar: "/images/technicians/priya.jpg",
    experience: 5,
    city: "Delhi",
    skills: ["AC Repair", "Solar Cleaning"],
    rating: 4.7,
    completedJobs: 210,
    status: "APPROVED",
    email: "priya.das@example.com",
    phone: "+91 99999 88888",
    appliedAt: "2026-05-10",
    documents: [
      { name: "Aadhaar Card", type: "Identity Proof", status: "APPROVED", url: "/docs/aadhaar_priya.pdf" },
      { name: "PAN Card", type: "Tax ID", status: "APPROVED", url: "/docs/pan_priya.pdf" }
    ]
  },
  {
    id: "TECH003",
    name: "Rajesh Kumar",
    avatar: "/images/technicians/rajesh.jpg",
    experience: 6,
    city: "Gurugram",
    skills: ["Plumbing", "Water Purifier"],
    rating: 4.2,
    completedJobs: 145,
    status: "PENDING_APPROVAL",
    email: "rajesh.k@example.com",
    phone: "+91 91234 56789",
    appliedAt: "2026-06-14",
    documents: [
      { name: "Aadhaar Card", type: "Identity Proof", status: "PENDING_APPROVAL", url: "/docs/aadhaar_rajesh.pdf" },
      { name: "PAN Card", type: "Tax ID", status: "PENDING_APPROVAL", url: "/docs/pan_rajesh.pdf" }
    ]
  },
  {
    id: "TECH004",
    name: "Vikram Singh",
    avatar: "/images/technicians/vikram.jpg",
    experience: 10,
    city: "Noida",
    skills: ["Electrical", "Home Automation"],
    rating: 4.9,
    completedJobs: 512,
    status: "APPROVED",
    email: "vikram.s@example.com",
    phone: "+91 88888 77777",
    appliedAt: "2025-11-20",
    documents: [
      { name: "Aadhaar Card", type: "Identity Proof", status: "APPROVED", url: "/docs/aadhaar_vikram.pdf" },
      { name: "PAN Card", type: "Tax ID", status: "APPROVED", url: "/docs/pan_vikram.pdf" }
    ]
  },
  {
    id: "TECH005",
    name: "Sneha Reddy",
    avatar: "/images/technicians/sneha.jpg",
    experience: 3,
    city: "Delhi",
    skills: ["Cleaning", "Disinfection"],
    rating: 4.0,
    completedJobs: 82,
    status: "REJECTED",
    email: "sneha.r@example.com",
    phone: "+91 77777 66666",
    appliedAt: "2026-04-15",
    rejectionReason: "Failed background check",
    rejectionNotes: "Address verification failed during the physical audit process.",
    documents: [
      { name: "Aadhaar Card", type: "Identity Proof", status: "APPROVED", url: "/docs/aadhaar_sneha.pdf" },
      { name: "PAN Card", type: "Tax ID", status: "REJECTED", url: "/docs/pan_sneha.pdf" }
    ]
  },
  {
    id: "TECH006",
    name: "Amit Patel",
    avatar: "/images/technicians/amit.jpg",
    experience: 4,
    city: "Delhi",
    skills: ["Electrical", "Cleaning"],
    rating: 4.5,
    completedJobs: 120,
    status: "PENDING_APPROVAL",
    email: "amit.patel@example.com",
    phone: "+91 90000 11111",
    appliedAt: "2026-06-15",
    documents: [
      { name: "Aadhaar Card", type: "Identity Proof", status: "PENDING_APPROVAL", url: "/docs/aadhaar_amit.pdf" },
      { name: "PAN Card", type: "Tax ID", status: "PENDING_APPROVAL", url: "/docs/pan_amit.pdf" }
    ]
  }
];