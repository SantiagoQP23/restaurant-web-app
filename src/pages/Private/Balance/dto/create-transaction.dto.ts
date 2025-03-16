import { PaymentMethod } from '../../../../models';
import { TransactionType } from '../../Common/enums/transaction-type.enum';

export interface CreateTransactionDto {
  title: string;
  description: string;
  amount: number;
  paymentMethod: PaymentMethod;
  type: TransactionType;
  categoryId: number;
  cashRegisterId?: number;
  accountId?: number;
  performedById?: string;
  isEditable?: boolean;
}
