import { useEffect } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  ActiveCashRegister,
  createCashRegister,
  getAllActiveCashRegisters,
  getAllCashRegisters,
  getCashRegister,
  getCashRegisterActive,
  updateCashRegister
} from '../services/cash-register.service';
import { useSnackbar } from 'notistack';
import { CashRegister } from '../models/cash-register.model';
import { CreateCashRegisterDto } from '../dto/create-cash-register.dto';
import { useCashRegisterStore } from '../../Common/store/useCashRegisterStore';
import { UpdateCashRegisterDto } from '../dto/update-cash-register.dto';
import { useDateFilter } from '../../../../hooks/useDateFilter';
import { Period } from '../../Common/dto/period.model';
import { usePaginationAsync } from '../../../../hooks/usePaginationAsync';

/**
 * Hook to fetch all cash registers with pagination and date filters
 * @version 2.0 - Migrated to React Query v5
 */
export const useAllCashRegister = () => {
  const dateFilter = useDateFilter(Period.MONTHLY);
  const pagination = usePaginationAsync();

  const cashRegisterQuery = useQuery({
    queryKey: ['cashRegister'],
    queryFn: () =>
      getAllCashRegisters({
        limit: pagination.rowsPerPage,
        offset: pagination.page,
        endDate: dateFilter.endDate,
        startDate: dateFilter.startDate,
        period: dateFilter.period
      })
  });

  useEffect(() => {
    cashRegisterQuery.refetch();
    pagination.resetPage();
  }, [
    pagination.rowsPerPage,
    dateFilter.startDate,
    dateFilter.endDate,
    dateFilter.period
  ]);

  useEffect(() => {
    cashRegisterQuery.refetch();
  }, [pagination.page]);

  return {
    cashRegisterQuery,
    ...dateFilter,
    ...pagination
  };
};

/**
 * Hook to fetch a single cash register by term
 * @version 2.0 - Migrated to React Query v5
 */
export const useCashRegister = (term: string) => {
  const cashRegisterQuery = useQuery({
    queryKey: ['cashRegister', term],
    queryFn: () => getCashRegister(term)
  });

  useEffect(() => {
    if (cashRegisterQuery.isError) {
      console.log(cashRegisterQuery.error);
    }
  }, [cashRegisterQuery.isError, cashRegisterQuery.error]);

  return {
    cashRegisterQuery
  };
};

/**
 * Hook to fetch the active cash register
 * @version 2.0 - Migrated to React Query v5
 */
export const useCashRegisterActive = () => {
  // const { setActiveCashRegister } = useCashRegisterStore((state) => state);

  const cashRegisterQuery = useQuery<ActiveCashRegister>({
    queryKey: ['cashRegisterActive'],
    queryFn: getCashRegisterActive
    // enabled: false,
  });

  useEffect(() => {
    if (cashRegisterQuery.isError) {
      console.log(cashRegisterQuery.error);
    }
  }, [cashRegisterQuery.isError, cashRegisterQuery.error]);

  // Uncomment if you need to update Zustand store
  // useEffect(() => {
  //   if (cashRegisterQuery.isSuccess && cashRegisterQuery.data) {
  //     setActiveCashRegister(cashRegisterQuery.data);
  //   }
  // }, [cashRegisterQuery.data, cashRegisterQuery.isSuccess, setActiveCashRegister]);

  return {
    cashRegisterQuery
  };
};

/**
 * Hook to fetch all active cash registers
 * @version 2.0 - Migrated to React Query v5
 */
export const useAllActiveCashRegisters = () => {
  const { loadCashRegisters } = useCashRegisterStore((state) => state);

  const cashRegisterQuery = useQuery<CashRegister[]>({
    queryKey: ['cashRegisterActives'],
    queryFn: getAllActiveCashRegisters
  });

  // Handle Zustand store integration
  useEffect(() => {
    if (cashRegisterQuery.isSuccess && cashRegisterQuery.data) {
      loadCashRegisters(cashRegisterQuery.data);
    }
  }, [cashRegisterQuery.data, cashRegisterQuery.isSuccess, loadCashRegisters]);

  useEffect(() => {
    if (cashRegisterQuery.isError) {
      console.log(cashRegisterQuery.error);
    }
  }, [cashRegisterQuery.isError, cashRegisterQuery.error]);

  return {
    cashRegisterQuery
  };
};

/**
 * Hook to create a new cash register
 * @version 2.0 - Migrated to React Query v5
 */
export const useCreateCashRegister = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { addCashRegister } = useCashRegisterStore((state) => state);
  const queryClient = useQueryClient();

  return useMutation<ActiveCashRegister, unknown, CreateCashRegisterDto>({
    mutationFn: (data: CreateCashRegisterDto) => createCashRegister(data),
    onSuccess: (data: ActiveCashRegister) => {
      enqueueSnackbar('Caja creada correctamente', { variant: 'success' });
      addCashRegister(data);
      queryClient.invalidateQueries({ queryKey: ['cashRegister'] });
      queryClient.invalidateQueries({ queryKey: ['cashRegisterActive'] });
      queryClient.invalidateQueries({ queryKey: ['cashRegisterActives'] });
    },
    onError: () => {
      enqueueSnackbar('Ocurrió un error al crear la caja', {
        variant: 'error'
      });
    }
  });
};

/**
 * Hook to update a cash register
 * @version 2.0 - Migrated to React Query v5
 */
export const useUpdateCashRegister = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { setActiveCashRegister } = useCashRegisterStore((state) => state);
  const queryClient = useQueryClient();

  return useMutation<CashRegister, unknown, UpdateCashRegisterDto>({
    mutationFn: (data: UpdateCashRegisterDto) => updateCashRegister(data),
    onSuccess: () => {
      enqueueSnackbar('Caja actualizada correctamente', {
        variant: 'success'
      });
      setActiveCashRegister(null);
      queryClient.invalidateQueries({ queryKey: ['cashRegister'] });
      queryClient.invalidateQueries({ queryKey: ['cashRegisterActive'] });
      queryClient.invalidateQueries({ queryKey: ['cashRegisterActives'] });
    },
    onError: () => {
      enqueueSnackbar('Ocurrió un error al actualizar la caja', {
        variant: 'error'
      });
    }
  });
};
