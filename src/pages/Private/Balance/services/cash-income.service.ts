import { restauranteApi } from '../../../../api';
// import { CreateCashIncomeDto } from "../dto/create-cash-transaction.dto";
// import { UpdateCashIncomeDto } from "../dto/update-cash-transaction.dto";
// import { CashIncome } from "../models/cash-transaction.model";

// export const createCashIncome = async (cashIncome: CreateCashIncomeDto): Promise<CashIncome> => {

//   const { data } = await restauranteApi.post<CashIncome>("/cash-incomes", cashIncome);

//   return data;

// }

// export const updateCashIncome = async (cashIncome: UpdateCashIncomeDto): Promise<CashIncome> => {

//   const { id, ...cashIncomeData } = cashIncome;

//   const { data } = await restauranteApi.patch<CashIncome>(`/cash-incomes/${cashIncome.id}`, cashIncomeData);

//   return data;

// }
