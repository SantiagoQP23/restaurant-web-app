import { useSnackbar } from 'notistack';
import {
  TransactionResponse,
  createTransaction,
  getTransactions,
  updateTransaction
} from '../services/transactions.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Transaction } from '../models/transaction.model';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { useDateFilter, usePaginationAsync } from '../../../../hooks';
import { useEffect } from 'react';
import { Period } from '../../Common/dto/period.model';

export const useCreateTransaction = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation<Transaction, unknown, CreateTransactionDto>({
    mutationFn: (data: CreateTransactionDto) => createTransaction(data),
    onSuccess: () => {
      enqueueSnackbar('Transacción creada', { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar('Error al crear la transacción', { variant: 'error' });
    }
  });
};

export const useUpdateTransaction = (id: number) => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation<Transaction, unknown, UpdateTransactionDto>({
    mutationFn: (data: UpdateTransactionDto) => updateTransaction(id, data),
    onSuccess: () => {
      enqueueSnackbar('Transacción actualizada', { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar('Error al actualizar la transacción', {
        variant: 'error'
      });
    }
  });
};

export const useTransactions = () => {
  const dateFilter = useDateFilter(Period.DAILY);
  const pagination = usePaginationAsync();

  const transactionsQuery = useQuery<TransactionResponse>({
    queryKey: ['transactions'],
    queryFn: () =>
      getTransactions({
        limit: pagination.rowsPerPage,
        offset: pagination.page,
        endDate: dateFilter.endDate,
        startDate: dateFilter.startDate,
        period: dateFilter.period
      })
  });
  useEffect(() => {
    transactionsQuery.refetch();
    pagination.resetPage();
  }, [
    pagination.rowsPerPage,
    dateFilter.startDate,
    dateFilter.endDate,
    dateFilter.period
  ]);

  useEffect(() => {
    transactionsQuery.refetch();
  }, [pagination.page]);

  return {
    transactionsQuery,
    ...dateFilter,
    ...pagination
  };
};
