import { CreateIncomeDto } from './create-income.dto';

export interface UpdateIncomeDto extends Partial<CreateIncomeDto> {
  id: string;
}
