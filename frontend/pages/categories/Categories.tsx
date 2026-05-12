import React, { useState, useMemo } from 'react';
import type { Category, CategorySaveData } from './types/CategoriesTypes';
import { useCategories } from './hooks/useCategory';
import ConfirmModal from '../../components/app/ConfirmModal';
import Toast from '../../components/app/Toast';
import CategoryTable from './components/CategoryTable';
import CategoryModal from './components/CategoryModal';

function App() {
  const { categories, isLoading, saveCategory, deleteCategory, toastConfig } = useCategories();
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategory = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return categories.filter(c => 
      (c?.name ? String(c.name).toLowerCase() : "").includes(term)
    );
  }, [categories, searchTerm]);

  const handleSaveCategory = (categoryData: CategorySaveData) => {
    saveCategory(
      { 
        data: categoryData, 
        id: editingCategory?.id 
      }, 
      {
        onSuccess: () => {
          setIsModalOpen(false);
          setEditingCategory(null);
        },
      }
    );
  };

  const confirmDelete = () => {
    if (categoryToDelete) {
      deleteCategory(categoryToDelete);
      setIsConfirmOpen(false);
      setCategoryToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-primary">Inventario Pro</h1>
          <div className="flex gap-2 w-full md:w-auto">
            <input 
              type="text" 
              placeholder="Buscar categoría..." 
              className="input input-bordered w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-primary" onClick={() => { setEditingCategory(null); setIsModalOpen(true); }}>
              + Nuevo
            </button>
          </div>
        </header>

        {isLoading ? <p>Cargando...</p> : (
          <CategoryTable 
            categories={filteredCategory} 
            onDelete={(id) => { setCategoryToDelete(id); setIsConfirmOpen(true); }}
            onEdit={(cat) => { setEditingCategory(cat); setIsModalOpen(true); }}
          />
        )}

        <CategoryModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSaveCategory}
          categoryToEdit={editingCategory}
        />

        <ConfirmModal 
          isOpen={isConfirmOpen}
          title="¿Confirmar eliminación?"
          message="Esta acción no se puede deshacer. La Categoría será borrada."
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={confirmDelete}
        />
      </div>
      {toastConfig && <Toast message={toastConfig.message} type={toastConfig.type} />}
    </div>
  );
}

export default App;