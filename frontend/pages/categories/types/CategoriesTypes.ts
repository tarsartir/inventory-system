/** Global */
export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface CategorySaveData {
  name: string;
  description: string;
}

/** Form */
export interface CategoryFormData {
  name: string;
  description: string;
}

export interface CategoryFormProps {
  categoryToEdit?: Category | null;
  onSave: (data: CategorySaveData) => void;
  onCancel: () => void;
  submitLabel: string;
}

/** Modal */
export interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: CategorySaveData) => void;
  categoryToEdit: Category | null;
}

/** Rows */
export interface CategoryRowProps {
  category: Category;
  onDelete: (id: number) => void;
  onEdit?: ((category: Category) => void) | undefined;
}

/** Table */
export interface CategoryTableProps {
  categories: Category[];
  onDelete: (id: number) => void;
  onEdit?: (category: Category) => void;
}