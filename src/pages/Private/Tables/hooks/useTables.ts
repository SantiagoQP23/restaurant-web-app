import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
import { queryKeys } from '@/api/query-keys';

/**
 * Hook to fetch all tables
 * @version 2.0 - Migrated to React Query v5
 */
export const useTables = () => {
  const dispatch = useDispatch();
  const tablesQuery = useQuery({
    queryKey: queryKeys.tables.all,
    queryFn: () => getTables()
  });

  // Handle Redux integration - dispatch on successful data fetch
  useEffect(() => {
    if (tablesQuery.isSuccess && tablesQuery.data) {
      dispatch(loadTables(tablesQuery.data));
    }
  }, [tablesQuery.data, tablesQuery.isSuccess, dispatch]);

  return {
    tablesQuery
  };
};

/**
 * Hook to update a single table
 * @version 2.0 - Migrated to React Query v5
 */
export const useUpdateTable = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation<ITable, unknown, UpdateUserDto>({
    mutationFn: (data: UpdateUserDto) => updateTableS(data),
    onSuccess: (data: ITable) => {
      enqueueSnackbar('Mesa actualizada correctamente', {
        variant: 'success'
      });

      dispatch(updateTable(data));
      queryClient.invalidateQueries({ queryKey: queryKeys.tables.all });
    },
    onError: () => {
      enqueueSnackbar('Error al actualizar la mesa', { variant: 'error' });
    }
  });
};

/**
 * Hook to update multiple tables at once
 * @version 2.0 - Migrated to React Query v5
 */
export const useUpdateManyTables = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation<ITable[], unknown, UpdateTableDto[]>({
    mutationFn: (data: UpdateTableDto[]) => updateManyTables(data),
    onSuccess: (data: ITable[]) => {
      enqueueSnackbar('Mesas actualizadas correctamente', {
        variant: 'success'
      });

      dispatch(loadTables(data));
      queryClient.invalidateQueries({ queryKey: queryKeys.tables.all });
    },
    onError: () => {
      enqueueSnackbar('Error al actualizar las mesas', {
        variant: 'error'
      });
    }
  });
};
