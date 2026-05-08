import React from 'react';

interface Product {
  id: number;
  sku: string;
  name: string;
  category_name: string;
  stock: number;
  price: number | string;
}

interface ProductRowProps {
  product: Product;
  onDelete: (id: number) => void;
  onEdit?: ((product: Product) => void) | undefined;
}

const ProductRow: React.FC<ProductRowProps> = ({ product, onDelete, onEdit }) => {
  return (
    <tr className="hover">
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
        <div className="flex gap-2">
          <button 
            className="btn btn-square btn-sm btn-outline"
            onClick={() => onEdit?.(product)}
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
        </div>
      </td>
    </tr>
  );
};

export default ProductRow;