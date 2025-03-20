import { DateFiltePaginationDto } from '../../../Common/dto';
import { FilterTransactionsDto } from './filter-transactions.dto';

export interface FilterIncomesDto
  extends FilterTransactionsDto,
    DateFiltePaginationDto {}
