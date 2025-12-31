import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ICategory } from '../../../../models';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';
import { createCategory, updateCategory } from '../services/menu.service';
import { useSnackbar } from 'notistack';
import { queryKeys } from '@/api/query-keys';

export const useCategories = () => {};

/**
 * Hook to create a new category
 * @version 2.0 - Migrated to React Query v5
 */
export const useCreateCategory = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation<ICategory, unknown, CreateCategoryDto>({
    mutationFn: (data: CreateCategoryDto) => createCategory(data),
    onSuccess: () => {
      enqueueSnackbar('Se creó correctamente', { variant: 'success' });
      queryClient.invalidateQueries({ queryKey: queryKeys.menu.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
    },
    onError: () => {
      enqueueSnackbar('No se pudo crear', { variant: 'error' });
    }
  });
};

/**
 * Hook to update a category
 * @version 2.0 - Migrated to React Query v5
 */
export const useUpdateCategory = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation<ICategory, unknown, UpdateCategoryDto>({
    mutationFn: (data: UpdateCategoryDto) => updateCategory(data.id, data),
    onSuccess: () => {
      enqueueSnackbar('Se actualizó correctamente', { variant: 'success' });
      queryClient.invalidateQueries({ queryKey: queryKeys.menu.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
    },
    onError: () => {
      enqueueSnackbar('No se pudo actualizar', { variant: 'error' });
    }
  });
};
