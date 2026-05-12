import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCategories } from '../../categories/hooks/useCategory';
import type { ProductSaveData } from '../types/ProductTypes';
import { productService } from '../services/productService';

export const useProducts = () => {
  const queryClient = useQueryClient();
  const [toastConfig, setToastConfig] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToastConfig({ message, type });
    setTimeout(() => setToastConfig(null), 3000);
  };

  const productesQuery = useQuery({
    queryKey: ['products'],
    queryFn: productService.getAll
  });

  const { categories, isLoading: isLoadingCategories } = useCategories();

  const saveMutation = useMutation({
    mutationFn: ({ data, id }: { data: ProductSaveData; id: number | undefined }) => 
      productService.save(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      showToast('¡Producto guardado con éxito!', 'success');
    },
    onError: () => showToast('Error al guardar el producto', 'error')
  });

  const deleteMutation = useMutation({
    mutationFn: productService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      showToast('¡Producto eliminada con éxito!', 'success');
    },
    onError: () => showToast('Error al eliminar la producto', 'error')
  });

  return {
    products: productesQuery.data ?? [],
    categories,
    isLoading: productesQuery.isLoading,
    saveProduct: saveMutation.mutate,
    deleteProduct: deleteMutation.mutate,
    toastConfig
  };
};