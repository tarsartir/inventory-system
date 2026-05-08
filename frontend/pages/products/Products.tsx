import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/axios';
import ProductTable from './ProductTable';
import ProductModal from './ProductModal';

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  sku: string;
  name: string;
  category_name: string;
  stock: number;
  price: number | string;
}

interface ProductSaveData {
  name: string;
  sku: string;
  stock: number;
  price: number;
  category_id: number;
}

const fetchProducts = async () => {
  const { data } = await api.get<Product[]>('products');
  return data;
};

const fetchCategories = async () => {
  const { data } = await api.get<Category[]>('categories');
  return data;
};

function App() {
  const queryClient = useQueryClient();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);

  const products = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });

  const categories = useQuery({ 
    queryKey: ['categories'], 
    queryFn: fetchCategories 
  });

  const saveMutation = useMutation({
    mutationFn: (productData: ProductSaveData) => {
      return editingProduct 
        ? api.put(`products/${editingProduct.id}`, productData)
        : api.post('products', productData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setIsModalOpen(false);
      setEditingProduct(null);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });

  const filteredProducts = useMemo(() => {
    const data = products.data || [];
    const term = searchTerm.toLowerCase();
    return data.filter(product => 
      product.name.toLowerCase().includes(term) || 
      product.sku.toLowerCase().includes(term) ||
      product.category_name?.toLowerCase().includes(term)
    );
  }, [products.data, searchTerm]);

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (productData: ProductSaveData) => {
    saveMutation.mutate(productData);
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm('¿Estás seguro?')) deleteMutation.mutate(id);
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

        <ProductTable 
          products={filteredProducts} 
          onDelete={handleDeleteProduct} 
          onEdit={handleEditClick}
        />

        <ProductModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSaveProduct}
          categories={categories.data || []}
          productToEdit={editingProduct}
        />
      </div>

      {/* Toast */}
      {showToast && (
        <div className="toast toast-end toast-bottom z-50">
          <div className="alert alert-success shadow-lg text-white">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-bold">¡Producto guardado con éxito!</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;