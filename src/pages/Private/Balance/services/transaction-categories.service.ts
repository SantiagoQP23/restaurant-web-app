import { restauranteApi } from '../../../../api';
import { TransactionCategory } from '../models/transaction-category.model';

export const getTransactionCategories = async () => {
  const response = await restauranteApi.get<TransactionCategory[]>(
    '/transaction-category'
  );
  return response.data;
};

export const createTransactionCategory = async (
  createTransactionCategoryDto: TransactionCategory
) => {
  const response = await restauranteApi.post<TransactionCategory>(
    '/transaction-category',
    createTransactionCategoryDto
  );
  return response.data;
};
