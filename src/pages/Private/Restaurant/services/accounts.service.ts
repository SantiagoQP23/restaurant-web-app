import { restauranteApi } from '../../../../api';
import { Account } from '../../../../models/financial/account.model';
import { CreateAccountDto } from '../dto/create-account.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';

export const getAccounts = async (): Promise<Account[]> => {
  const { data } = await restauranteApi.get<Account[]>('/accounts');
  return data;
};

export const createAccount = async (
  dto: CreateAccountDto
): Promise<Account> => {
  if (dto.num === '') {
    delete dto.num;
  }
  const { data } = await restauranteApi.post<Account>('/accounts', dto);
  return data;
};

export const updateAccount = async (
  id: number,
  dto: UpdateAccountDto
): Promise<Account> => {
  if (dto.num === '') {
    delete dto.num;
  }
  const { data } = await restauranteApi.patch<Account>(`/accounts/${id}`, dto);
  return data;
};
