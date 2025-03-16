import { TransactionType } from '../../Common/enums/transaction-type.enum';

export interface CreateCashTransactionDto {
  description: string;
  type: TransactionType;
  amount: number;
  cashRegisterId: number;
  performedById: string;
  categoryId: number;
  isEditable?: boolean;
}
