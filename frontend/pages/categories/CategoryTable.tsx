import React from 'react';
import CategoryRow from './CategoryRow';

interface Category {
  id: number;
  name: string;
  description: string;
}

interface CategoryTableProps {
  categories: Category[];
  onDelete: (id: number) => void;
  onEdit?: (category: Category) => void;
}

const CategoryTable: React.FC<CategoryTableProps> = ({ categories, onDelete, onEdit }) => {
  return (
    <div className="overflow-x-auto bg-base-100 rounded-box shadow-xl">
      <table className="table table-zebra w-full">
        <thead>
          <tr className="bg-base-300">
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((category) => (
              <CategoryRow 
                key={category.id} 
                category={category} 
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
        <p>No se encontraron categorias que coincidan...</p>
      </div>
    </td>
  </tr>
);

export default CategoryTable;