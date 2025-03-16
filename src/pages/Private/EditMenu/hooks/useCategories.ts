import { useMutation } from '@tanstack/react-query';
import { ICategory } from '../../../../models';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';
import { createCategory, updateCategory } from '../services/menu.service';
import { useSnackbar } from 'notistack';

export const useCategories = () => {};

export const useCreateCategory = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation<ICategory, unknown, CreateCategoryDto>(
    (data) => createCategory(data),
    {
      onSuccess: () => {
        enqueueSnackbar('Se creó correctamente', { variant: 'success' });
      },
      onError: () => {
        enqueueSnackbar('No se pudo crear', { variant: 'error' });
      }
    }
  );
};

export const useUpdateCategory = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation<ICategory, unknown, UpdateCategoryDto>(
    (data) => updateCategory(data.id, data),
    {
      onSuccess: () => {
        enqueueSnackbar('Se actualizó correctamente', { variant: 'success' });
      },
      onError: () => {
        enqueueSnackbar('No se pudo actualizar', { variant: 'error' });
      }
    }
  );
};
