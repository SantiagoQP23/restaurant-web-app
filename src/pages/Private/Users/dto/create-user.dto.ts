import { TypeIdentification } from '../../../../models/common.model';

export interface CreateUserDto {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  typeIdentification: TypeIdentification;
  numberIdentification: string;
  numPhone?: string;
  rol: string;
}
