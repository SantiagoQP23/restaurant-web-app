import { CreateAccountDto } from './create-account.dto';

export interface UpdateAccountDto extends Partial<CreateAccountDto> {}
