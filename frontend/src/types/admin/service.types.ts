export type ServiceStatus = 'Active' | 'Inactive';

export interface AdminService {
  id: number;
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
  id: number;
  name: string;
  category: string;
  subcategory: string;
  price: string;
  duration: string;
  status: ServiceStatus;
}


export interface Subcategory {
  id: number;
  name: string;
  categoryId: number;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  subcategories: string[];
}

