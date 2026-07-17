export interface Complaint {
  id: string;
  customerName: string;
  technicianName: string;
  bookingId: string;
  issueType: string;
  priority: "Low" | "Medium" | "High";
  status:
    | "Open"
    | "Assigned"
    | "In Progress"
    | "Resolved"
    | "Closed";

  createdAt: string;
}

export const complaintsData: Complaint[] = [
  {
    id: "CMP001",
    customerName: "Rahul Sharma",
    technicianName: "Arjun Sharma",
    bookingId: "HC1001",
    issueType: "Late Arrival",
    priority: "High",
    status: "Open",
    createdAt: "12 Aug 2025",
  },
  {
    id: "CMP002",
    customerName: "Priya Singh",
    technicianName: "Aman Verma",
    bookingId: "HC1002",
    issueType: "Poor Service Quality",
    priority: "Medium",
    status: "In Progress",
    createdAt: "14 Aug 2025",
  },
];