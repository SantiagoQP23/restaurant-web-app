import { useEffect } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createIncome,
  deleteIncome,
  getIncomes,
  updateIncome
} from '../services/incomes.service';
import { useSnackbar } from 'notistack';
import { CreateIncomeDto } from '../dto/create-income.dto';
import { Income } from '../models/income.model';
import { UpdateIncomeDto } from '../dto/update-income.dto';
// import { queryClient } from '../../../../main';
import { useFilterIncomes } from './useFilterIncomes';

export const useIncomes = () => {
  const filter = useFilterIncomes();

  const incomesQuery = useQuery(['incomes'], () =>
    getIncomes({
      offset: filter.page,
      limit: filter.rowsPerPage,
      startDate: filter.startDate,
      endDate: filter.endDate,
      period: filter.period,
      cashRegisterId: filter.cashRegister ? filter.cashRegister.id : undefined,
      userId: filter.user ? filter.user.id : undefined
    })
  );

  useEffect(() => {
    incomesQuery.refetch();
    filter.resetPage();
  }, [
    filter.startDate,
    filter.endDate,
    filter.period,
    filter.cashRegister,
    filter.user,
    filter.rowsPerPage
  ]);

  useEffect(() => {
    incomesQuery.refetch();
  }, [filter.page]);

  return {
    incomesQuery,
    ...filter
  };
};

export const useCreateIncome = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation<Income, unknown, CreateIncomeDto>(createIncome, {
    onSuccess: () => {
      enqueueSnackbar('Ingreso creado correctamente', { variant: 'success' });
      queryClient.invalidateQueries({ queryKey: ['cashRegisterActive'] });

      queryClient.invalidateQueries(['incomes']);
    },
    onError: () => {
      enqueueSnackbar('Error al crear el ingreso', { variant: 'error' });
    }
  });
};

export const useUpdateIncome = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation<Income, unknown, UpdateIncomeDto>(updateIncome, {
    onSuccess: () => {
      enqueueSnackbar('Ingreso actualizado correctamente', {
        variant: 'success'
      });
      queryClient.invalidateQueries({ queryKey: ['cashRegisterActive'] });

      queryClient.invalidateQueries(['incomes']);

      // queryClient.invalidateQueries(['cashRegisterActive']);
    },
    onError: () => {
      enqueueSnackbar('Error al actualizar el ingreso', { variant: 'error' });
    }
  });
};

export const useDeleteIncome = (id: string) => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();

  return useMutation(() => deleteIncome(id), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cashRegisterActive'] });

      queryClient.invalidateQueries(['incomes']);
      enqueueSnackbar('Ingreso eliminado correctamente', {
        variant: 'success'
      });
    },
    onError: () => {
      enqueueSnackbar('Error al eliminar el ingreso', { variant: 'error' });
    }
  });
};
