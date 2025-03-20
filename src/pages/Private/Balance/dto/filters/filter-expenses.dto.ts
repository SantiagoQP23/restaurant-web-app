import { DateFiltePaginationDto } from '../../../Common/dto';
import { FilterTransactionsDto } from './filter-transactions.dto';

export interface FilterExpensesDto
  extends FilterTransactionsDto,
    DateFiltePaginationDto {}
