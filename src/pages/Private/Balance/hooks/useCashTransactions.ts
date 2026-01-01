import { useMutation } from '@tanstack/react-query';
import {
  createCashTransaction,
  deleteCashTransaction,
  updateCashTransaction
} from '../services/cash-transactions.service';
import { useSnackbar } from 'notistack';
import { queryClient } from '../../../../api/query-client';
import { UpdateCashTransactionDto } from '../dto/update-cash-transaction.dto';
import { CashTransaction } from '../models/cash-transaction.model';
import { CreateCashTransactionDto } from '../dto/create-cash-transaction.dto';
import { useCashRegisterStore } from '../../Common/store/useCashRegisterStore';
import { TransactionType } from '../../Common/enums/transaction-type.enum';

export const useCreateCashTransaction = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { activeCashRegister, setActiveCashRegister, updateCashRegister } =
    useCashRegisterStore();

  return useMutation<CashTransaction, unknown, CreateCashTransactionDto>({
    mutationFn: (data: CreateCashTransactionDto) => createCashTransaction(data),
    onSuccess: (cashTransaction) => {
      enqueueSnackbar('Transacción creada', { variant: 'success' });
      if (activeCashRegister) {
        const totalIncome =
          cashTransaction.type === TransactionType.INCOME
            ? activeCashRegister.totalIncome + cashTransaction.amount
            : activeCashRegister.totalIncome;

        const totalExpense =
          cashTransaction.type === TransactionType.EXPENSE
            ? activeCashRegister.totalExpense + cashTransaction.amount
            : activeCashRegister.totalExpense;

        const cashRegisterUpdated = {
          ...activeCashRegister,
          balance:
            totalIncome - totalExpense + activeCashRegister.initialAmount,
          totalIncome,
          totalExpense,
          cashTransactions: [
            cashTransaction,
            ...activeCashRegister.cashTransactions
          ]
        };
        setActiveCashRegister(cashRegisterUpdated);
        updateCashRegister(cashRegisterUpdated);
      }

      queryClient.invalidateQueries({ queryKey: ['cashRegisterActive'] });
    },
    onError: () => {
      enqueueSnackbar('Error al crear la transacción', { variant: 'error' });
    }
  });
};

export const useUpdateCashTransaction = (cashTransaction: CashTransaction) => {
  const { enqueueSnackbar } = useSnackbar();
  const { activeCashRegister, setActiveCashRegister, updateCashRegister } =
    useCashRegisterStore();

  return useMutation<CashTransaction, unknown, UpdateCashTransactionDto>({
    mutationFn: (data: UpdateCashTransactionDto) =>
      updateCashTransaction(cashTransaction.id, data),
    onSuccess: (cashTransactionUpdated) => {
      enqueueSnackbar('Transacción actualizada', {
        variant: 'success'
      });

      if (activeCashRegister) {
        const transactionsUpdated = activeCashRegister.cashTransactions.map(
          (c) =>
            c.id === cashTransactionUpdated.id ? cashTransactionUpdated : c
        );

        const cashRegisterUpdated = {
          ...activeCashRegister,
          cashTransactions: transactionsUpdated
        };

        if (cashTransaction.amount !== cashTransactionUpdated.amount) {
          const difference =
            cashTransactionUpdated.amount - cashTransaction.amount;

          const totalIncome =
            cashTransactionUpdated.type === TransactionType.INCOME
              ? activeCashRegister.totalIncome + difference
              : activeCashRegister.totalIncome;

          const totalExpense =
            cashTransactionUpdated.type === TransactionType.EXPENSE
              ? activeCashRegister.totalExpense + difference
              : activeCashRegister.totalExpense;

          cashRegisterUpdated.balance =
            totalIncome - totalExpense + activeCashRegister.initialAmount;
          cashRegisterUpdated.totalIncome = totalIncome;
          cashRegisterUpdated.totalExpense = totalExpense;
        }

        setActiveCashRegister(cashRegisterUpdated);
        updateCashRegister(cashRegisterUpdated);
      }

      queryClient.invalidateQueries({ queryKey: ['cashRegisterActive'] });
    },
    onError: () => {
      enqueueSnackbar('Error al actualizar la transacción', {
        variant: 'error'
      });
    }
  });
};

export const useDeleteCashTransaction = (cashTransaction: CashTransaction) => {
  const { enqueueSnackbar } = useSnackbar();
  const { activeCashRegister, setActiveCashRegister, updateCashRegister } =
    useCashRegisterStore();

  return useMutation({
    mutationFn: () => deleteCashTransaction(cashTransaction.id),
    onSuccess: () => {
      enqueueSnackbar('Transacción eliminada', { variant: 'success' });
      if (activeCashRegister) {
        const totalIncome =
          cashTransaction.type === TransactionType.INCOME
            ? activeCashRegister.totalIncome - cashTransaction.amount
            : activeCashRegister.totalIncome;

        const totalExpense =
          cashTransaction.type === TransactionType.EXPENSE
            ? activeCashRegister.totalExpense - cashTransaction.amount
            : activeCashRegister.totalExpense;

        const cashRegisterUpdated = {
          ...activeCashRegister,
          balance:
            totalIncome - totalExpense + activeCashRegister.initialAmount,
          cashTransactions: activeCashRegister.cashTransactions.filter(
            (c) => c.id !== cashTransaction.id
          )
        };
        setActiveCashRegister(cashRegisterUpdated);
        updateCashRegister(cashRegisterUpdated);
      }

      queryClient.invalidateQueries({ queryKey: ['cashRegisterActive'] });
    },
    onError: () => {
      enqueueSnackbar('Error al eliminar la transacción', {
        variant: 'error'
      });
    }
  });
};
