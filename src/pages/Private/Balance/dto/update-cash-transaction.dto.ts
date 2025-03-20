import { CreateCashTransactionDto } from './create-cash-transaction.dto';

export interface UpdateCashTransactionDto
  extends Partial<CreateCashTransactionDto> {}
