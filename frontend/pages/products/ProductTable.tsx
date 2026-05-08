import React from 'react';
import ProductRow from '../../components/products/ProductRow';

interface Product {
  id: number;
  sku: string;
  name: string;
  category_name: string;
  stock: number;
  price: number | string;
}

interface ProductTableProps {
  products: Product[];
  onDelete: (id: number) => void;
  onEdit?: (product: Product) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, onDelete, onEdit }) => {
  return (
    <div className="overflow-x-auto bg-base-100 rounded-box shadow-xl">
      <table className="table table-zebra w-full">
        <thead>
          <tr className="bg-base-300">
            <th>ID</th>
            <th>SKU</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Stock</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <ProductRow 
                key={product.id} 
                product={product} 
                onDelete={onDelete} 
                onEdit={onEdit} 
              />
            ))
          ) : (
            <EmptyState />
          )}
        </tbody>
      </table>
    </div>
  );
};

const EmptyState = () => (
  <tr>
    <td colSpan={7} className="text-center py-10">
      <div className="flex flex-col items-center opacity-50">
        <span className="text-4xl" role="img" aria-label="search">🔍</span>
        <p>No se encontraron productos que coincidan...</p>
      </div>
    </td>
  </tr>
);

export default ProductTable;