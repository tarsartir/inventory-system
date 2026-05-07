import React, { useState, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

interface Category {
  id: number;
  name: string;
}

interface ProductFormData {
  name: string;
  sku: string;
  stock: number | string;
  price: number | string;
  category_id: number | string;
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: any) => void;
  categories: Category[];
  productToEdit: any | null; // <-- Nueva prop
}

const ProductModal: React.FC<ProductModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  categories, 
  productToEdit
}) => {
  
  const [newProduct, setNewProduct] = useState<ProductFormData>({
    name: '', 
    sku: '', 
    stock: 0, 
    price: 0, 
    category_id: ''
  });

  useEffect(() => {
    if (productToEdit) {
      setNewProduct({
        name: productToEdit.name,
        sku: productToEdit.sku,
        stock: productToEdit.stock,
        price: productToEdit.price,
        category_id: productToEdit.category_id || '' 
      });
    } else {
      setNewProduct({ name: '', sku: '', stock: 0, price: 0, category_id: '' });
    }
  }, [productToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newProduct.category_id) {
      alert("Por favor, selecciona una categoría");
      return;
    }
    
    const cleanedData = {
      ...newProduct,
      stock: Number(newProduct.stock),
      price: Number(newProduct.price),    
      category_id: Number(newProduct.category_id)
    };

    onSave(cleanedData);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">
          {productToEdit ? 'Editar Producto' : 'Nuevo Producto'}
        </h3>
        <form onSubmit={handleSubmit}>
          <input 
            name="name"
            type="text" 
            placeholder="Nombre" 
            className="input input-bordered w-full mb-2" 
            value={newProduct.name}
            onChange={handleChange} 
            required 
          />
          
          <div className="grid grid-cols-2 gap-2 mb-2">
            <input 
              name="sku"
              type="text" 
              placeholder="SKU" 
              className="input input-bordered" 
              value={newProduct.sku}
              onChange={handleChange} 
              required 
            />

            <select 
              name="category_id"
              className="select select-bordered" 
              value={newProduct.category_id}
              onChange={handleChange} 
              required>
              <option value="">Categoría</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            <input 
              name="price"
              type="number" 
              placeholder="Precio" 
              className="input input-bordered" 
              value={newProduct.price}
              onChange={handleChange} 
              required 
            />

            <input 
              name="stock"
              type="number" 
              placeholder="Stock" 
              className="input input-bordered" 
              value={newProduct.stock}
              onChange={handleChange} 
              required
            />
          </div>

          <div className="modal-action">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn btn-primary">
              {productToEdit ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;