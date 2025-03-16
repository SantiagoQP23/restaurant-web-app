import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getTables,
  updateManyTables,
  updateTable as updateTableS
} from '../services';
import { ITable } from '../../../../models';
import { UpdateUserDto } from '../../Users/dto';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { loadTables, updateTable } from '../../../../redux';
import { UpdateTableDto } from '../dto/table.dto';

export const useTables = () => {
  const dispatch = useDispatch();
  const tablesQuery = useQuery(['tables'], () => getTables(), {
    onSuccess: (data) => {
      dispatch(loadTables(data));
    }
  });
  return {
    tablesQuery
  };
};

export const useUpdateTable = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  return useMutation<ITable, unknown, UpdateUserDto>(
    (data) => updateTableS(data),
    {
      onSuccess: (data) => {
        enqueueSnackbar('Mesa actualizada correctamente', {
          variant: 'success'
        });

        dispatch(updateTable(data));
      },
      onError: () => {
        enqueueSnackbar('Error al actualizar la mesa', { variant: 'error' });
      }
    }
  );
};

export const useUpdateManyTables = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  return useMutation<ITable[], unknown, UpdateTableDto[]>(
    (data) => updateManyTables(data),
    {
      onSuccess: (data) => {
        enqueueSnackbar('Mesas actualizadas correctamente', {
          variant: 'success'
        });

        dispatch(loadTables(data));
      },
      onError: () => {
        enqueueSnackbar('Error al actualizar las mesas', {
          variant: 'error'
        });
      }
    }
  );
};
