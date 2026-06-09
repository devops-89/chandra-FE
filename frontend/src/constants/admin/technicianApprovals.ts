export interface TechnicianApproval {
  id: string;
  name: string;
  skills: string[];
  experience: number;
  status: "pending" | "approved" | "rejected";
  documentsVerified: boolean;
}
