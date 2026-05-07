import React, { useEffect, useState, useMemo } from 'react';
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

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);

  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    const term = searchTerm.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(term) || 
      product.sku.toLowerCase().includes(term) ||
      product.category_name?.toLowerCase().includes(term)
    );
  }, [products, searchTerm]);

  const fetchData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        api.get<Product[]>('products'),
        api.get<Category[]>('categories')
      ]);

      setProducts(prodRes.data);
      setCategories(catRes.data);
    } catch (err) {
      console.error("Error al cargar datos:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

    
  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (productData: ProductSaveData) => {
    try {
      if (editingProduct) {
        await api.put(`products/${editingProduct.id}`, productData);
      } else {
        await api.post('products', productData);
      }
      
      await fetchData();
      setIsModalOpen(false);
      setEditingProduct(null);
      setShowToast(true);
    } catch (err) {
      alert("Error al guardar");
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;
    
    try {
      await api.delete(`products/${id}`);
      fetchData();
    } catch (err) {
      alert("Error al eliminar");
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

        <ProductTable 
          products={filteredProducts} 
          onDelete={handleDeleteProduct} 
          onEdit={handleEditClick}
        />

        <ProductModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSaveProduct}
          categories={categories}
          productToEdit={editingProduct}
        />
      </div>

      {/* Toast con DaisyUI */}
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