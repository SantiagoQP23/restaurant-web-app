import { restauranteApi } from '../../../../api';
import { CreateIncomeDto } from '../dto/create-income.dto';
import { FilterIncomesDto } from '../dto/filters/filter-incomes.dto';
import { UpdateIncomeDto } from '../dto/update-income.dto';
import { Income } from '../models/income.model';

export interface IncomesResponse {
  incomes: Income[];
  count: number;
}

export const getIncomes = async (
  filterDto: FilterIncomesDto
): Promise<IncomesResponse> => {
  const { limit = 10, offset = 0, ...restFilter } = filterDto;

  const { data } = await restauranteApi.get<IncomesResponse>('/incomes', {
    params: {
      ...restFilter,
      offset: limit * offset,
      limit
    }
  });

  return data;
};

export const createIncome = async (
  income: CreateIncomeDto
): Promise<Income> => {
  const { data } = await restauranteApi.post<Income>('/incomes', income);

  return data;
};

export const updateIncome = async (
  income: UpdateIncomeDto
): Promise<Income> => {
  const { id, ...incomeDto } = income;

  const { data } = await restauranteApi.patch<Income>(
    `/incomes/${id}`,
    incomeDto
  );

  return data;
};

export const deleteIncome = async (id: string): Promise<void> => {
  await restauranteApi.delete<void>(`/incomes/${id}`);
};
