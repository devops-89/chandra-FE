export interface TechnicianProfile {
  id: number;
  userId: number;
  yearsOfExperience: number;
  languages: string[] | null;
  status: string;
  rejectionReason: string | null;
  jobStatus: string;
  lastSeenAt: string | null;

  aadharUrl: string;
  panUrl: string;
  policeCertUrl: string;
  tradeLicenseUrl: string;
  selfieUrl: string;

  hasLadder: boolean;
  hasACGauges: boolean;
  hasSafetyEquipment: boolean;
  hasVehicle: boolean;

  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;

  createdAt: string;
  updatedAt: string;

  services: unknown[];
  brandExpertise: unknown[];
  locations: unknown[];
}

export interface TechnicianUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phone: string;
  emergencyContact: string | null;
  profileImage: string | null;

  role: string;
  status: string;

  createdAt: string;
  lastLoginAt: string;

  technicianProfile: TechnicianProfile;
}

export interface TechnicianProfileResponse {
  success: boolean;
  statusCode: number;
  message: string;

  data: {
    success: boolean;
    message: string;
    data: TechnicianUser;
  };
}