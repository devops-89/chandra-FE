export interface ActiveJob {
  id: string;
  customerName: string;
  technicianName: string;
  service: string;
  status:
    | "booked"
    | "assigned"
    | "on_way"
    | "started"
    | "completed";
}