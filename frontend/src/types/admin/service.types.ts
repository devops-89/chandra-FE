export type ServiceStatus = 'Active' | 'Inactive';

export interface AdminService {
  id: string;
  image: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  duration: string;
  status: ServiceStatus;
  bookings: number;
}

/** Shape of the edit form's controlled state */
export interface EditServiceFormData {
  name: string;
  category: string;
  subcategory: string;
  price: string;
  duration: string;
  status: ServiceStatus;
}
