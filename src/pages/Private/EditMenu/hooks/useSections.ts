import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { ISection } from '../../../../models';
import { UpdateSectionDto } from '../dto/update-section.dto';
import {
  createSection,
  updateManySections,
  updateSection
} from '../services/menu.service';
import { CreateSectionDto } from '../dto/create-section.dto';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadMenu,
  loadSections,
  selectMenu,
  updateSection as updateSectionStore
} from '../../../../redux';
import { queryKeys } from '@/api/query-keys';

export const useSections = () => {};

/**
 * Hook to create a new section
 * @version 2.0 - Migrated to React Query v5
 */
export const useCreateSection = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation<ISection, unknown, CreateSectionDto>({
    mutationFn: (data: CreateSectionDto) => createSection(data),
    onSuccess: (data: ISection) => {
      enqueueSnackbar('The section was created successfully', {
        variant: 'success'
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.menu.all });
    },
    onError: (error: unknown) => {
      enqueueSnackbar('No se pudo crear', { variant: 'error' });
    }
  });
};

/**
 * Hook to update a section
 * @version 2.0 - Migrated to React Query v5
 */
export const useUpdateSection = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation<ISection, unknown, UpdateSectionDto>({
    mutationFn: (data: UpdateSectionDto) => updateSection(data.id!, data),
    onSuccess: (data: ISection) => {
      enqueueSnackbar('Se actualizó correctamente', { variant: 'success' });
      dispatch(updateSectionStore(data));
      queryClient.invalidateQueries({ queryKey: queryKeys.menu.all });
    },

    onError: () => {
      enqueueSnackbar('No se pudo actualizar', { variant: 'error' });
    }
  });
};

/**
 * Hook to update multiple sections at once
 * @version 2.0 - Migrated to React Query v5
 */
export const useUpdateManySections = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation<ISection[], unknown, UpdateSectionDto[]>({
    mutationFn: (data: UpdateSectionDto[]) => updateManySections(data),
    onSuccess: (data: ISection[]) => {
      enqueueSnackbar('Se actualizó correctamente', { variant: 'success' });
      // dispatch(loadSections(data));
      queryClient.invalidateQueries({ queryKey: queryKeys.menu.all });
    },

    onError: () => {
      enqueueSnackbar('No se pudo actualizar', { variant: 'error' });
    }
  });
};
