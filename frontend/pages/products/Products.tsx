import React, { useState, useMemo } from 'react';
import type { Product, ProductSaveData } from './types/ProductTypes';
import { useProducts } from './hooks/useProduct';
import ConfirmModal from '../../components/app/ConfirmModal';
import Toast from '../../components/app/Toast';
import ProductTable from './components/ProductTable';
import ProductModal from './components/ProductModal';

function App() {
  const { products, categories, isLoading, saveProduct, deleteProduct, toastConfig } = useProducts();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return products.filter(c => 
      (c?.name ? String(c.name).toLowerCase() : "").includes(term)
    );
  }, [products, searchTerm]);

  const handleSaveProduct = (productData: ProductSaveData) => {
    saveProduct(
      { 
        data: productData, 
        id: editingProduct?.id 
      }, 
      {
        onSuccess: () => {
          setIsModalOpen(false);
          setEditingProduct(null);
        },
      }
    );
  };

  const confirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete);
      setIsConfirmOpen(false);
      setProductToDelete(null);
    }
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
                placeholder="Buscar producto..." 
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

        {isLoading ? <p>Cargando...</p> : (
          <ProductTable 
            products={filteredProducts} 
            onDelete={(id) => { setProductToDelete(id); setIsConfirmOpen(true); }}
            onEdit={(cat) => { setEditingProduct(cat); setIsModalOpen(true); }}
          />
        )}

        <ProductModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSaveProduct}
          categories={categories}
          productToEdit={editingProduct}
        />

        <ConfirmModal 
          isOpen={isConfirmOpen}
          title="¿Confirmar eliminación?"
          message={"Esta acción no se puede deshacer.\n El producto será borrado del inventario."} 
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