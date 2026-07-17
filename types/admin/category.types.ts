export interface Subcategory {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

export interface FormErrors {
  name?: string;
  category?: string;
  subcategory?: string;
  pricingType?: string;
  basePrice?: string;
  duration?: string;
  description?: string;
}

/** Form state for adding/editing a category */
export interface CategoryFormData {
  name: string;
}

/** Form state for adding/editing a subcategory */
export interface SubcategoryFormData {
  name: string;
  categoryId: string;
}

export interface Pricing {
  data: { pricingType: string; basePrice: string; };
  errors: FormErrors;
  onChange: (field: string, value: string) => void;
}
