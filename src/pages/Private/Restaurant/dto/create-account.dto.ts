import { AccountType } from '../../../../models/financial/account.model';

export interface CreateAccountDto {
  name: string;
  description?: string;
  num?: string;
  type: AccountType;
}
