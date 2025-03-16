import { IUser, PaymentMethod } from '../../../../models';
import { TransactionType } from '../../Common/enums/transaction-type.enum';
import { TransactionCategory } from './transaction-category.model';

export interface Transaction {
  id: number;
  amount: number;
  title: string;
  description: string;
  paymentMethod: PaymentMethod;
  createdBy: IUser;
  num: number;
  type: TransactionType;
  user: IUser;
  createdAt: string;
  updatedAt: string;
  category: TransactionCategory;
  isActive: boolean;
  isEditable: boolean;
}
