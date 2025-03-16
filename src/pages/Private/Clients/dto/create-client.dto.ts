import { TypeIdentification } from '../../../../models/common.model';

export interface CreateClientDto {
  firstName: string;
  lastName: string;
  email?: string;
  numPhone?: string;
  typeIdentification?: TypeIdentification;
  numberIdentification?: string;
  address?: string;
}
