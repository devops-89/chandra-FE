export interface BankDetailsFormData {
  accountHolderName: string;
  ifscCode: string;
  accountNumber: string;
  confirmAccountNumber: string;
  payoutMethod: 'bank-transfer' | 'upi';
  cancelledCheque?: File;
  bankPassbook?: File;
}

export interface AutoDetectedBankInfo {
  bankName: string;
  branchName: string;
}

export interface BankDetailsCardProps {
  title: string;
  subtitle?: string;
}

export interface PayoutMethodOption {
  id: string;
  label: string;
  description: string;
  icon?: string;
}

export interface VerificationDocument {
  id: string;
  name: string;
  description: string;
  icon: string;
  maxSize: number;
  acceptedFormats: string[];
}
