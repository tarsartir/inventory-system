import React, { useState, useEffect } from 'react';
import type { ChangeEvent, SubmitEvent } from 'react';
import type { ProductFormData, ProductFormProps } from '../types/ProductTypes';

const ProductForm: React.FC<ProductFormProps> = ({ 
  categories, 
  productToEdit, 
  onSave, 
  onCancel,
  submitLabel 
}) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '', 
    sku: '', 
    stock: 0, 
    price: 0, 
    category_id: ''
  });

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name,
        sku: productToEdit.sku,
        stock: productToEdit.stock,
        price: productToEdit.price,
        category_id: productToEdit.category_id || '' 
      });
    }
  }, [productToEdit]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.category_id) {
      alert("Por favor, selecciona una categoría");
      return;
    }
    
    const cleanedData = {
      ...formData,
      stock: Number(formData.stock),
      price: Number(formData.price),    
      category_id: Number(formData.category_id)
    };

    onSave(cleanedData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        name="name"
        type="text" 
        placeholder="Nombre" 
        className="input input-bordered w-full mb-2" 
        value={formData.name}
        onChange={handleChange} 
        required 
      />
      
      <div className="grid grid-cols-2 gap-2 mb-2">
        <input 
          name="sku"
          type="text" 
          placeholder="SKU" 
          className="input input-bordered" 
          value={formData.sku}
          onChange={handleChange} 
          required 
        />

        <select 
          name="category_id"
          className="select select-bordered" 
          value={formData.category_id}
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
          value={formData.price}
          onChange={handleChange} 
          required 
        />

        <input 
          name="stock"
          type="number" 
          placeholder="Stock" 
          className="input input-bordered" 
          value={formData.stock}
          onChange={handleChange} 
          required
        />
      </div>

      <div className="modal-action">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary">
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;