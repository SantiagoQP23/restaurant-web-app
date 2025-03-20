import { IUser } from '../../../../models';
import { TransactionType } from '../../Common/enums/transaction-type.enum';
import { TransactionCategory } from './transaction-category.model';

export interface CashTransaction {
  id: number;
  description: string;
  performedBy: IUser;
  type: TransactionType;
  amount: number;
  createdBy: IUser;
  createdAt: Date;
  updatedAt: Date;
  category: TransactionCategory;
  isEditable: boolean;
  isActive: boolean;
}
