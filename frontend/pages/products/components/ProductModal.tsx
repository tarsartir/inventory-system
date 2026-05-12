import React from 'react';
import type { Category } from '../types/ProductTypes';
import ProductForm from './ProductForm';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: any) => void;
  categories: Category[];
  productToEdit: any | null;
}

const ProductModal: React.FC<ProductModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  categories, 
  productToEdit
}) => {
  
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">
          {productToEdit ? 'Editar Producto' : 'Nuevo Producto'}
        </h3>
        
        <ProductForm 
          categories={categories}
          productToEdit={productToEdit}
          onSave={onSave}
          onCancel={onClose}
          submitLabel={productToEdit ? 'Actualizar' : 'Guardar'}
        />
      </div>
    </div>
  );
};

export default ProductModal;