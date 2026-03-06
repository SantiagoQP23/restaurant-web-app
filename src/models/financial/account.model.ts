export enum AccountType {
  CASH = 'CASH',
  BANK = 'BANK'
}

export interface Account {
  id: number;
  name: string;
  description: string;
  num: string;
  type: AccountType;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
