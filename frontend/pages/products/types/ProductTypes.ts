//** Global */
export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  sku: string;
  name: string;
  category_name: string;
  stock: number;
  price: number | string;
}

export interface ProductSaveData {
  name: string;
  sku: string;
  stock: number;
  price: number;
  category_id: number;
}

//** Form */
export interface ProductFormData {
  name: string;
  sku: string;
  stock: number | string;
  price: number | string;
  category_id: number | string;
}

export interface ProductFormProps {
  categories: Category[];
  productToEdit?: any | null;
  onSave: (data: any) => void;
  onCancel: () => void;
  submitLabel: string;
}

/** Modal */
export interface Category {
  id: number;
  name: string;
}

export interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: any) => void;
  categories: Category[];
  productToEdit: any | null;
}

/** Table */
export interface ProductTableProps {
  products: Product[];
  onDelete: (id: number) => void;
  onEdit?: (product: Product) => void;
}

/** Rows */
export interface ProductRowProps {
  product: Product;
  onDelete: (id: number) => void;
  onEdit?: ((product: Product) => void) | undefined;
}