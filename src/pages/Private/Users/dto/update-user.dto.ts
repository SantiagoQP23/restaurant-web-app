import { TypeIdentification } from '../../../../models/common.model';

export interface UpdateUserDto {
  id: string;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  typeIdentification?: TypeIdentification;
  numberIdentification?: string;
  numPhone?: string;
  rol?: string;
  isActive?: boolean;
}

export interface ResetPasswordUserDto {
  userId: string;
}
