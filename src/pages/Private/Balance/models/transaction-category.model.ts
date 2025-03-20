import { TransactionType } from '../../Common/enums/transaction-type.enum';

export interface TransactionCategory {
  id: number;
  name: string;
  description: string;
  transactionType: TransactionType;
  createdAt: Date;
  updatedAt: Date;
  color: string;
  isActive: boolean;
}
