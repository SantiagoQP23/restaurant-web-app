import { useDateFilter } from '../../../../hooks/useDateFilter';
import { usePaginationAsync } from '../../../../hooks/usePaginationAsync';
import { Period } from '../../Common/dto/period.model';
import { useFilterTransactions } from './useFilterTransactions';

export const useFilterIncomes = () => {
  const dateFilter = useDateFilter(Period.DAILY);

  const pagination = usePaginationAsync();

  const transactionsFilter = useFilterTransactions();

  return {
    ...dateFilter,
    ...pagination,
    ...transactionsFilter
  };
};
