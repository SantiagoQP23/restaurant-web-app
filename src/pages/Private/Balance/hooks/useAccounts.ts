import { useMutation, useQuery } from '@tanstack/react-query';
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

export const useAccounts = () => {
  const accountsQuery = useQuery(['accounts'], () => getAccounts(), {
    onSuccess: () => {}
  });

  return {
    accountsQuery
  };
};

export const useAccount = (id: number) => {
  const accountQuery = useQuery(['account', id], () => getAccount(id), {
    onSuccess: () => {}
  });

  return {
    accountQuery
  };
};

export const useCreateAccount = () => {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation<Account, unknown, CreateAccountDto>(createAccount, {
    onSuccess: () => {
      enqueueSnackbar('Cuenta creada', {
        variant: 'success'
      });
    },
    onError: () => {
      enqueueSnackbar('Error al crear la cuenta', {
        variant: 'error'
      });
    }
  });
};

export const useUpdateAccount = (accountId: number) => {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation<Account, unknown, UpdateAccountDto>(
    (account) => updateAccount(accountId, account),
    {
      onSuccess: () => {
        enqueueSnackbar('Cuenta actualizada', {
          variant: 'success'
        });
      },
      onError: () => {
        enqueueSnackbar('Error al actualizar la cuenta', {
          variant: 'error'
        });
      }
    }
  );
};
