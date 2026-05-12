import React from 'react';
import type { Category, CategoryRowProps } from '../types/CategoriesTypes'

const CategoryRow: React.FC<CategoryRowProps> = ({ category, onDelete, onEdit }) => {
  return (
    <tr className="hover">
      <th>{category.id}</th>
      <td>
        <div className="badge badge-ghost font-mono">
          {category.name}
        </div>
      </td>
      <td>
        <div className="badge badge-ghost font-mono">
          {category.description}
        </div>
      </td>
      <td>
        <div className="flex gap-2">
          <button 
            className="btn btn-square btn-sm btn-outline"
            onClick={() => onEdit?.(category)}
            title="Editar categoria"
          >
            ✏️
          </button>
          <button 
            className="btn btn-square btn-sm btn-outline btn-error" 
            onClick={() => onDelete(category.id)}
            title="Eliminar categoria"
          > 
            🗑️ 
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CategoryRow;