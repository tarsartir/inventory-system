import React, { useState, useEffect } from 'react';
import type { ChangeEvent, SubmitEvent } from 'react';

interface CategoryFormData {
  name: string;
  description: string;
}

interface CategoryFormProps {
  categoryToEdit?: any | null;
  onSave: (data: any) => void;
  onCancel: () => void;
  submitLabel: string;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ 
  categoryToEdit, 
  onSave, 
  onCancel,
  submitLabel 
}) => {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    description: ''
  });

  useEffect(() => {
    if (categoryToEdit) {
      setFormData({
        name: categoryToEdit.name,
        description: categoryToEdit.description,
      });
    }
  }, [categoryToEdit]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const cleanedData = {
      ...formData,
      description: String(formData.description),
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

      <input 
        name="description"
        type="textarea" 
        placeholder="Descripción" 
        className="input input-bordered w-full mb-2" 
        value={formData.description}
        onChange={handleChange} 
        required 
      />

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

export default CategoryForm;