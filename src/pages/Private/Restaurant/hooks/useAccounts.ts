import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { Account } from '../../../../models/financial/account.model';
import { CreateAccountDto } from '../dto/create-account.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';
import {
  createAccount,
  getAccounts,
  updateAccount
} from '../services/accounts.service';

const QUERY_KEY = ['restaurant-accounts'] as const;

export const useAccounts = () => {
  return useQuery<Account[]>({
    queryKey: QUERY_KEY,
    queryFn: getAccounts
  });
};

export const useCreateAccount = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation<Account, unknown, CreateAccountDto>({
    mutationFn: (dto) => createAccount(dto),
    onSuccess: () => {
      enqueueSnackbar('Cuenta creada', { variant: 'success' });
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
    onError: () => {
      enqueueSnackbar('No se pudo crear la cuenta', { variant: 'error' });
    }
  });
};

interface UpdateAccountVars {
  id: number;
  dto: UpdateAccountDto;
}

export const useUpdateAccount = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation<Account, unknown, UpdateAccountVars>({
    mutationFn: ({ id, dto }) => updateAccount(id, dto),
    onSuccess: () => {
      enqueueSnackbar('Cuenta actualizada', { variant: 'success' });
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
    onError: () => {
      enqueueSnackbar('No se pudo actualizar la cuenta', { variant: 'error' });
    }
  });
};
