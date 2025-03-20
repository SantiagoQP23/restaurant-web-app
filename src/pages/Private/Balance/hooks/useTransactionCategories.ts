import { useQuery } from '@tanstack/react-query';
import { getTransactionCategories } from '../services/transaction-categories.service';

export const useTransactionCategories = () => {
  return useQuery(['transaction-categories'], getTransactionCategories, {});
};
