export interface SupportTicket {
  id: string;

  subject: string;

  category:
    | 'Payment'
    | 'Technical'
    | 'Job Issue'
    | 'Account';

  priority:
    | 'Low'
    | 'Medium'
    | 'High';

  status:
    | 'Open'
    | 'In Progress'
    | 'Resolved';

  createdAt: string;
}