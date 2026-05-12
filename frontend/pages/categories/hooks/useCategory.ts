import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { CategorySaveData } from '../types/CategoriesTypes';
import { categoryService } from '../services/categoryService';

export const useCategories = () => {
  const queryClient = useQueryClient();
  const [toastConfig, setToastConfig] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToastConfig({ message, type });
    setTimeout(() => setToastConfig(null), 3000);
  };

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: categoryService.getAll
  });

  const saveMutation = useMutation({
    mutationFn: ({ data, id }: { data: CategorySaveData; id: number | undefined }) => 
      categoryService.save(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      showToast('¡Categoría guardada con éxito!', 'success');
    },
    onError: () => showToast('Error al guardar la categoría', 'error')
  });

  const deleteMutation = useMutation({
    mutationFn: categoryService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      showToast('¡Categoría eliminada con éxito!', 'success');
    },
    onError: () => showToast('Error al eliminar la categoría', 'error')
  });

  return {
    categories: categoriesQuery.data ?? [],
    isLoading: categoriesQuery.isLoading,
    saveCategory: saveMutation.mutate,
    deleteCategory: deleteMutation.mutate,
    toastConfig
  };
};