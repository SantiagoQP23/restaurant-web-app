import { IUser } from '../../../../models';
import { CashTransaction } from './cash-transaction.model';

export interface CashRegister {
  id: number;
  initialAmount: number;
  totalIncome: number;
  totalExpense: number;
  finalAmount: number;
  isClosed: boolean;
  closedAt?: Date;
  balance: number;
  createdAt: string;
  updatedAt: Date;
  closedBy: IUser;
  createdBy: IUser;
  discrepancy: number;
  cashTransactions: CashTransaction[];
}
