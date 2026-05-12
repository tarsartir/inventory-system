import api from '../../../api/axios';
import type { Category, CategorySaveData } from '../types/CategoriesTypes';

export const categoryService = {
  // GET
  getAll: async (): Promise<Category[]> => {
    const { data } = await api.get<Category[]>('categories');
    return data;
  },

  // POST / PUT
  save: async (categoryData: CategorySaveData, id?: number) => {
    return id
      ? api.put(`categories/${id}`, categoryData)
      : api.post('categories', categoryData);
  },

  // DELETE
  delete: async (id: number) => {
    return api.delete(`categories/${id}`);
  }
};