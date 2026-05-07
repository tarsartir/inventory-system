import React from 'react';

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
              <tr key={product.id} className="hover">
                <th>{product.id}</th>
                <td>
                  <div className="badge badge-ghost font-mono">
                    {product.sku}
                  </div>
                </td>
                <td className="font-bold">{product.name}</td>
                <td>
                  <span className="badge badge-outline">
                    {product.category_name}
                  </span>
                </td>
                <td>
                  <span className={`badge ${Number(product.stock) < 5 ? 'badge-error' : 'badge-success'}`}>
                    {product.stock}
                  </span>
                </td>
                <td>${Number(product.price).toFixed(2)}</td>
                <td>
                  <button 
                    className="btn btn-square btn-sm btn-outline mr-2"
                    onClick={() => onEdit && onEdit(product)}
                    title="Editar producto"
                  >
                    ✏️
                  </button>
                  <button 
                    className="btn btn-square btn-sm btn-outline btn-error" 
                    onClick={() => onDelete(product.id)}
                    title="Eliminar producto"
                  > 
                    🗑️ 
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center py-10">
                <div className="flex flex-col items-center opacity-50">
                  <span className="text-4xl" role="img" aria-label="search">🔍</span>
                  <p>No se encontraron productos que coincidan...</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;