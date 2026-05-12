import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/axios';
import ConfirmModal from '../../components/app/ConfirmModal';
import Toast from '../../components/app/Toast';
import CategoryTable from './CategoryTable';
import CategoryModal from './CategoryModal';

interface Category {
  id: number;
  name: string;
  description: string;
}

interface CategorySaveData {
  name: string;
  description: string;
}

const fetchCategory = async (): Promise<Category[]> => {
  const { data } = await api.get<Category[]>('categories');
  return data;
};

function App() {
  const queryClient = useQueryClient();
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [toastConfig, setToastConfig] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const category = useQuery({
    queryKey: ['category'],
    queryFn: fetchCategory
  });


  const saveMutation = useMutation({
    mutationFn: (categoryData: CategorySaveData) => {
      return editingCategory
        ? api.put(`categories/${editingCategory.id}`, categoryData)
        : api.post('categories', categoryData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['category'] });
      setIsModalOpen(false);
      setEditingCategory(null);
      setToastConfig({ message: '¡Categoria guardada con éxito!', type: 'success' });
      setTimeout(() => setToastConfig(null), 3000);
    },
    onError: () => {
      setToastConfig({ message: 'Error al guardar la categoria', type: 'error' });
      setTimeout(() => setToastConfig(null), 3000);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`categories/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['category'] });
      setToastConfig({ message: '¡Categoria eliminada con éxito!', type: 'success' });
      setTimeout(() => setToastConfig(null), 3000);
    },
    onError: () => {
      setToastConfig({ message: 'Error al eliminar la categoria', type: 'error' });
      setTimeout(() => setToastConfig(null), 3000);
    }
  });

  const confirmDelete = () => {
    if (categoryToDelete) {
      deleteMutation.mutate(categoryToDelete);
      setIsConfirmOpen(false);
      setCategoryToDelete(null);
    }
  };

  const filteredCategory = useMemo(() => {
    const data = Array.isArray(category.data) ? category.data : [];
    const term = searchTerm.toLowerCase().trim();
    return data.filter(c => { const categoryName = c?.name ? String(c.name).toLowerCase() : ""; return categoryName.includes(term);
  });
  }, [category.data, searchTerm]);

  const handleEditClick = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleSaveCategory = (categoryData: CategorySaveData) => {
    saveMutation.mutate(categoryData);
  };

  const handleDeleteClick = (id: number) => {
    setCategoryToDelete(id);
    setIsConfirmOpen(true);
  };

  return (
    <div className="min-h-screen bg-base-200 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-primary">Inventario Pro</h1>
          
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <input 
                type="text" 
                placeholder="Buscar categoria..." 
                className="input input-bordered w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
              + Nuevo
            </button>
          </div>
        </header>

        <CategoryTable 
          categories={filteredCategory} 
          onDelete={handleDeleteClick}
          onEdit={handleEditClick}
        />

        <CategoryModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSaveCategory}
          categoryToEdit={editingCategory}
        />

        <ConfirmModal 
          isOpen={isConfirmOpen}
          title="¿Confirmar eliminación?"
          message={"Esta acción no se puede deshacer.\n La Categoria será borrada."}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={confirmDelete}
        />
      </div>

      {/* Toast */}
      {toastConfig && (
        <Toast message={toastConfig.message} type={toastConfig.type} />
      )}
    </div>
  );
}

export default App;