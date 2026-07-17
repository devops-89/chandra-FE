export interface SupportTicket {
  id: string;

  subject: string;

  category: string;

  priority: string;

  status: string;

  createdAt: string;
}

export interface SupportState {
  tickets: SupportTicket[];

  loading: boolean;

  error: string | null;
}