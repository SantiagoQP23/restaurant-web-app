import { restauranteApi } from '../../../../api';
import { DateFiltePaginationDto } from '../../Common/dto';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { Transaction } from '../models/transaction.model';

export interface TransactionResponse {
  transactions: Transaction[];
  count: number;
}

export const getTransactions = async (filterDto: DateFiltePaginationDto) => {
  console.log(filterDto);
  const { offset = 0, limit = 10 } = filterDto;
  const response = await restauranteApi.get<TransactionResponse>(
    '/transactions',
    {
      params: {
        startDate: filterDto.startDate,
        endDate: filterDto.endDate,
        offset: offset * limit,
        limit,
        period: filterDto.period
      }
    }
  );
  return response.data;
};

export const createTransaction = async (
  createTransactionDto: CreateTransactionDto
) => {
  const response = await restauranteApi.post<Transaction>(
    '/transactions',
    createTransactionDto
  );
  return response.data;
};

export const updateTransaction = async (
  id: number,
  createTransactionDto: UpdateTransactionDto
) => {
  const response = await restauranteApi.put<Transaction>(
    `/transactions/${id}`,
    createTransactionDto
  );
  return response.data;
};

export const deleteTransaction = async (id: number) => {
  const response = await restauranteApi.delete<Transaction>(
    `/transactions/${id}`
  );
  return response.data;
};
