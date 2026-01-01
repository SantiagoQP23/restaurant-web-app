import { useQuery } from '@tanstack/react-query';
import { getTransactionCategories } from '../services/transaction-categories.service';

export const useTransactionCategories = () => {
  return useQuery({
    queryKey: ['transaction-categories'],
    queryFn: getTransactionCategories
  });
};
