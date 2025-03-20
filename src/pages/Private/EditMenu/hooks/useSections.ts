import { useMutation } from '@tanstack/react-query';
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

export const useSections = () => {};

export const useCreateSection = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation<ISection, unknown, CreateSectionDto>(
    (data) => createSection(data),
    {
      onSuccess: (data) => {
        enqueueSnackbar('Se creó correctamente', { variant: 'success' });
      },
      onError: (error) => {
        enqueueSnackbar('No se pudo crear', { variant: 'error' });
      }
    }
  );
};

export const useUpdateSection = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  return useMutation<ISection, unknown, UpdateSectionDto>(
    (data) => updateSection(data.id!, data),
    {
      onSuccess: (data) => {
        enqueueSnackbar('Se actualizó correctamente', { variant: 'success' });
        dispatch(updateSectionStore(data));
      },

      onError: () => {
        enqueueSnackbar('No se pudo actualizar', { variant: 'error' });
      }
    }
  );
};

export const useUpdateManySections = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  return useMutation<ISection[], unknown, UpdateSectionDto[]>(
    (data) => updateManySections(data),
    {
      onSuccess: (data) => {
        enqueueSnackbar('Se actualizó correctamente', { variant: 'success' });
        // dispatch(loadSections(data));
      },

      onError: () => {
        enqueueSnackbar('No se pudo actualizar', { variant: 'error' });
      }
    }
  );
};
