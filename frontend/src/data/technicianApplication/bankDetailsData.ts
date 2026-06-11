import type { AutoDetectedBankInfo,PayoutMethodOption, VerificationDocument } from '@/types/technicianApplication/bankDetails.types';

export const PAYOUT_METHOD_OPTIONS: PayoutMethodOption[] = [
  {
    id: 'bank-transfer',
    label: 'Bank Transfer',
    description: 'Direct deposit to account',
  },
  {
    id: 'upi',
    label: 'UPI ID',
    description: 'Instant mobile transfer',
  },
];

export const VERIFICATION_DOCUMENTS: VerificationDocument[] = [
  {
    id: 'cancelled-cheque',
    name: 'Cancelled Cheque',
    description: 'PDF, JPG or PNG (Max 5MB)',
    icon: 'upload_file',
    maxSize: 5 * 1024 * 1024, // 5MB
    acceptedFormats: ['application/pdf', 'image/jpeg', 'image/png'],
  },
  {
    id: 'bank-passbook',
    name: 'Bank Passbook Copy',
    description: 'Front page showing details',
    icon: 'account_balance_wallet',
    maxSize: 5 * 1024 * 1024, // 5MB
    acceptedFormats: ['application/pdf', 'image/jpeg', 'image/png'],
  },
];

export const AUTO_DETECTED_BANK_INFO: AutoDetectedBankInfo = {
  bankName: '—',
  branchName: '—',
};

export const SECURITY_BANNER_MESSAGE = 'Your bank details are encrypted and stored securely. Payouts are only processed for verified accounts.';
