import { Account } from './account.model';

export enum PaymentMethodCategory {
  CASH = 'CASH',
  CARD = 'CARD',
  TRANSFER = 'TRANSFER',
  DIGITAL_WALLET = 'DIGITAL_WALLET',
  OTHER = 'OTHER'
}

export interface PaymentMethod {
  id: number;
  name: string;
  commissionPercentage: number;
  type: PaymentMethodCategory;
  allowedDestinationAccounts: Account[];
  defaultDestinationAccount?: Account;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
