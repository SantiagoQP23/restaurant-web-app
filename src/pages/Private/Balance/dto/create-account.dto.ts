import { AccountType } from '../../Common/enums/account-type.enum';

export interface CreateAccountDto {
  name: string;
  description: string;
  num: string;
  initialBalance: number;
  type: AccountType;
  holderId: string;
  bankId: number;
}
