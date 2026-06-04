export interface Invoice {
  id: string;
  invoiceNumber: string;
  serviceName: string;
  date: string;
  amount: number;
  status: 'PAID' | 'PENDING';
}

export interface Props {
  invoice: Invoice;
}