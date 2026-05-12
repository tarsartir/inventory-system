import api from '../../../api/axios';
import type { Product, Category, ProductSaveData } from '../types/ProductTypes';

export const productService = {
  // GET
  getAll: async (): Promise<Product[]> => {
    const { data } = await api.get<Product[]>('products');
    return data;
  },

  // POST / PUT
  save: async (productData: ProductSaveData, id?: number) => {
    return id
      ? api.put(`products/${id}`, productData)
      : api.post('products', productData);
  },

  // DELETE
  delete: async (id: number) => {
    return api.delete(`products/${id}`);
  }
};