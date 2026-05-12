import React from 'react';
import CategoryForm from './CategoryForm';


interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: any) => void;
  categoryToEdit: any | null;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  categoryToEdit
}) => {
  
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">
          {categoryToEdit ? 'Editar Producto' : 'Nuevo Producto'}
        </h3>
        
        <CategoryForm 
          categoryToEdit={categoryToEdit}
          onSave={onSave}
          onCancel={onClose}
          submitLabel={categoryToEdit ? 'Actualizar' : 'Guardar'}
        />
      </div>
    </div>
  );
};

export default CategoryModal;