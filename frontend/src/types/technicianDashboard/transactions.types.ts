export interface Props {
  transaction: {
    id: string;
    job: string;
    customer: string;
    date: string;
    amount: string;
    status: string;
  };
}

export interface Props {
    status:{status: string;}
  
}

export interface Transaction {
  id: string;
  job: string;
  customer: string;
  date: string;
  amount: string;
  status: 'Completed' | 'Pending';
}