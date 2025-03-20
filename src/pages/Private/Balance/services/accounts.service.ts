import { restauranteApi } from '../../../../api';
import { Account } from '../../Common/models/account.model';
import { CreateAccountDto } from '../dto/create-account.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';

export const createAccount = async (
  account: CreateAccountDto
): Promise<Account> => {
  const { data } = await restauranteApi.post<Account>('/accounts', account);
  return data;
};

export const getAccounts = async (): Promise<Account[]> => {
  const { data } = await restauranteApi.get<Account[]>('/accounts');
  return data;
};

export const getAccount = async (id: number): Promise<Account> => {
  const { data } = await restauranteApi.get<Account>(`/accounts/${id}`);
  return data;
};

export const updateAccount = async (
  id: number,
  account: UpdateAccountDto
): Promise<Account> => {
  const { data } = await restauranteApi.patch<Account>(
    `/accounts/${id}`,
    account
  );
  return data;
};

export const deleteAccount = async (id: number): Promise<void> => {
  await restauranteApi.delete(`/accounts/${id}`);
};
