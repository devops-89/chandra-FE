export interface Availability {
  isAvailable: boolean;
  workingHours: string;
  serviceRadius: string;
}

export interface BankDetails {
  accountHolder: string;
  accountNumber: string;
  ifscCode: string;
  upiId: string;
}

export interface TechnicianProfile {
  id: string;

  fullName: string;
  email: string;
  phone: string;

  profileImage: string;

  address: string;

  experience: number;

  rating: number;

  completedJobs: number;

  skills: string[];

  serviceCategories: string[];

  verified: boolean;

  availability: Availability;

  bankDetails: BankDetails;
}