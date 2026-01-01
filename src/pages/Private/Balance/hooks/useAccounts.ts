import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createAccount,
  getAccount,
  getAccounts,
  updateAccount
} from '../services/accounts.service';
import { useSnackbar } from 'notistack';
import { UpdateAccountDto } from '../dto/update-account.dto';
import { CreateAccountDto } from '../dto/create-account.dto';
import { Account } from '../../Common/models/account.model';

/**
 * Hook to fetch all accounts
 * @version 2.0 - Migrated to React Query v5
 */
export const useAccounts = () => {
  const accountsQuery = useQuery({
    queryKey: ['accounts'],
    queryFn: () => getAccounts()
  });

  return {
    accountsQuery
  };
};

/**
 * Hook to fetch a single account by ID
 * @version 2.0 - Migrated to React Query v5
 */
export const useAccount = (id: number) => {
  const accountQuery = useQuery({
    queryKey: ['account', id],
    queryFn: () => getAccount(id)
  });

  return {
    accountQuery
  };
};

/**
 * Hook to create a new account
 * @version 2.0 - Migrated to React Query v5
 */
export const useCreateAccount = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation<Account, unknown, CreateAccountDto>({
    mutationFn: (data: CreateAccountDto) => createAccount(data),
    onSuccess: () => {
      enqueueSnackbar('Cuenta creada', {
        variant: 'success'
      });
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
    onError: () => {
      enqueueSnackbar('Error al crear la cuenta', {
        variant: 'error'
      });
    }
  });
};

/**
 * Hook to update an account
 * @version 2.0 - Migrated to React Query v5
 */
export const useUpdateAccount = (accountId: number) => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation<Account, unknown, UpdateAccountDto>({
    mutationFn: (account: UpdateAccountDto) =>
      updateAccount(accountId, account),
    onSuccess: () => {
      enqueueSnackbar('Cuenta actualizada', {
        variant: 'success'
      });
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      queryClient.invalidateQueries({ queryKey: ['account', accountId] });
    },
    onError: () => {
      enqueueSnackbar('Error al actualizar la cuenta', {
        variant: 'error'
      });
    }
  });
};
