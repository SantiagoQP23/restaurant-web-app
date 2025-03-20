import { CreateTransactionDto } from './create-transaction.dto';

export interface UpdateTransactionDto extends Partial<CreateTransactionDto> {}
