import { IUser } from '../../../../models';
import { AccountType } from '../enums/account-type.enum';
import { Bank } from './bank.model';

export interface Account {
  id: number;
  name: string;
  description: string;
  holder: IUser;
  bank: Bank;
  type: AccountType;
  initialBalance: number;
  balance: number;
  creditCard: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
