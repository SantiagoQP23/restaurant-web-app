import { DateFiltePaginationDto } from '../../Common/dto/date-filter-pagination.dto';
import restauranteApi from '../../../../api/restauranteApi';

export interface IncomeResponse {
  date: string;
  total: string;
  totalCash: string;
  totalTransfer: string;
}

export interface ExpenseResponse {
  date: string;
  total: string;
  totalCash: string;
  totalTransfer: string;
}

export interface FinanceResponse {
  date: string;
  income: IncomeResponse;
  expense: ExpenseResponse;
  balance: number;
}

export const getFinances = async (
  filterDto: DateFiltePaginationDto
): Promise<FinanceResponse[]> => {
  const {
    period,
    startDate,
    endDate,
    offset = 0,
    limit = 10,
    groupBy
  } = filterDto;

  const resp = await restauranteApi.get<FinanceResponse[]>(`/financials`, {
    params: {
      period,
      startDate,
      endDate,
      offset: limit * offset,
      limit,
      groupBy
    }
  });

  return resp.data;
};
