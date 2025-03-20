import { restauranteApi } from '../../../../api';
import { CreateCashTransactionDto } from '../dto/create-cash-transaction.dto';
import { UpdateCashTransactionDto } from '../dto/update-cash-transaction.dto';
import { CashTransaction } from '../models/cash-transaction.model';

// export const getCashTransactions = async (filterDto: FilterCashTransactionsDto): Promise<CashTransactionsResponse> => {

//   const { limit=10, offset = 0, ...restFilter } = filterDto;

//   const { data } = await restauranteApi.get<CashTransactionsResponse>("/cash-transactions", {
//     params: {
//       ...restFilter,
//       offset: limit * offset,
//       limit
//     }
//   });

//   return data;
// }

export const createCashTransaction = async (
  expense: CreateCashTransactionDto
): Promise<CashTransaction> => {
  const { data } = await restauranteApi.post<CashTransaction>(
    '/cash-transactions',
    expense
  );

  return data;
};

export const updateCashTransaction = async (
  id: number,
  updateCashTransaction: UpdateCashTransactionDto
): Promise<CashTransaction> => {
  const { data } = await restauranteApi.patch<CashTransaction>(
    `/cash-transactions/${id}`,
    updateCashTransaction
  );

  return data;
};

export const deleteCashTransaction = async (id: number): Promise<void> => {
  await restauranteApi.delete<void>(`/cash-transactions/${id}`);
};
