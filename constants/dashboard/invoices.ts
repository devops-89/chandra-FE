import type { Invoice } from '@/types/invoicesTypes/invoice.types';

export const invoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-1001',
    serviceName: 'Solar Cleaning',
    date: '24 June 2026',
    amount: 999,
    status: 'PAID',
  },
  {
    id: '2',
    invoiceNumber: 'INV-1002',
    serviceName: 'AC Servicing',
    date: '20 June 2026',
    amount: 699,
    status: 'PAID',
  },
  {
    id: '3',
    invoiceNumber: 'INV-1003',
    serviceName: 'Electrical Repair',
    date: '18 June 2026',
    amount: 499,
    status: 'PENDING',
  },
];