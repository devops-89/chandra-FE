'use client';

import { useEffect, useState } from 'react';

export interface WalletData {
  balance: number;
  todayEarnings: number;
  totalEarnings: number;
  thisMonth: number;
  thisWeek: number;
}

export interface TransactionItem {
  id: string;
  job: string;
  customer: string;
  date: string;
  amount: string;
  status: 'Completed' | 'Pending' | 'Failed' | 'Processing';
}

export interface DocumentItem {
  status: 'Verified' | 'Pending' | 'Rejected' | 'Not Uploaded';
  number: string;
  file?: string;
}

export interface ProfileData {
  name: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  skills: string[];
  experience: string;
  serviceCategories: string[];
  workingHours: string;
  serviceRadius: number;
  bankHolder: string;
  bankAccount: string;
  bankIfsc: string;
  upiId: string;
  notifications: {
    push: boolean;
    email: boolean;
    sms: boolean;
  };
  documents: {
    aadhaar: DocumentItem;
    pan: DocumentItem;
    dl: DocumentItem;
  };
}

const DEFAULT_WALLET: WalletData = {
  balance: 12600,
  todayEarnings: 1450,
  totalEarnings: 84500,
  thisMonth: 18250,
  thisWeek: 4850,
};

const DEFAULT_TRANSACTIONS: TransactionItem[] = [
  {
    id: 'TXN-1001',
    job: 'AC Deep Cleaning',
    customer: 'Robert Harrison',
    date: '12 Jun 2026',
    amount: '₹2,500',
    status: 'Completed',
  },
  {
    id: 'TXN-1002',
    job: 'Kitchen Plumbing',
    customer: 'Sarah Wilson',
    date: '10 Jun 2026',
    amount: '₹1,200',
    status: 'Pending',
  },
  {
    id: 'TXN-1003',
    job: 'Electrical Repair',
    customer: 'James Clark',
    date: '08 Jun 2026',
    amount: '₹1,800',
    status: 'Completed',
  },
];

const DEFAULT_PROFILE: ProfileData = {
  name: 'Vikram Singh',
  phone: '+91 98765 43210',
  email: 'vikram@example.com',
  addressLine1: 'Tower A, Green Valley Apartments',
  addressLine2: 'Sector 52, Gurgaon, Haryana, India',
  skills: ['Air Conditioner Repair', 'Washing Machine Repair', 'Refrigerator Repair'],
  experience: '5 Years',
  serviceCategories: ['Cleaning', 'Plumbing', 'Electrical'],
  workingHours: '09:00 AM - 07:00 PM',
  serviceRadius: 15,
  bankHolder: 'Vikram Singh',
  bankAccount: 'XXXX XXXX 4587',
  bankIfsc: 'HDFC0001234',
  upiId: 'vikram@okaxis',
  notifications: {
    push: true,
    email: true,
    sms: false,
  },
  documents: {
    aadhaar: { status: 'Verified', number: 'XXXX XXXX 4587' },
    pan: { status: 'Verified', number: 'XXXX XXXX 1294' },
    dl: { status: 'Verified', number: 'DL-142021XXXXXX' },
  },
};

export function useTechnicianData() {

    // Load from localStorage on mount
    const [wallet, setWalletState] = useState<WalletData>(() => {
  if (typeof window === 'undefined') return DEFAULT_WALLET;

  const value = localStorage.getItem('tech_wallet');
  return value ? JSON.parse(value) : DEFAULT_WALLET;
});

const [transactions, setTransactionsState] = useState<TransactionItem[]>(() => {
  if (typeof window === 'undefined') return DEFAULT_TRANSACTIONS;

  const value = localStorage.getItem('tech_transactions');
  return value ? JSON.parse(value) : DEFAULT_TRANSACTIONS;
});

const [profile, setProfileState] = useState<ProfileData>(() => {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;

  const value = localStorage.getItem('tech_profile');
  return value ? JSON.parse(value) : DEFAULT_PROFILE;
});

  const updateWallet = (newWallet: Partial<WalletData>) => {
    const updated = { ...wallet, ...newWallet };
    setWalletState(updated);
    localStorage.setItem('tech_wallet', JSON.stringify(updated));
    window.dispatchEvent(new Event('tech_data_change'));
  };

  const updateTransactions = (newTxns: TransactionItem[]) => {
    setTransactionsState(newTxns);
    localStorage.setItem('tech_transactions', JSON.stringify(newTxns));
    window.dispatchEvent(new Event('tech_data_change'));
  };

  const updateProfile = (newProfile: Partial<ProfileData>) => {
    const updated = { ...profile, ...newProfile };
    setProfileState(updated);
    localStorage.setItem('tech_profile', JSON.stringify(updated));
    window.dispatchEvent(new Event('tech_data_change'));
  };

  useEffect(() => {
    const handleSync = () => {
      const wVal = localStorage.getItem('tech_wallet');
      if (wVal) setWalletState(JSON.parse(wVal));
      const tVal = localStorage.getItem('tech_transactions');
      if (tVal) setTransactionsState(JSON.parse(tVal));
      const pVal = localStorage.getItem('tech_profile');
      if (pVal) setProfileState(JSON.parse(pVal));
    };

    window.addEventListener('tech_data_change', handleSync);
    return () => window.removeEventListener('tech_data_change', handleSync);
  }, []);

  return {
    wallet,
    transactions,
    profile,
    updateWallet,
    updateTransactions,
    updateProfile,
  };
}