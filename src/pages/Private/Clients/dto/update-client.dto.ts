import { TypeIdentification } from '../../../../models/common.model';
export interface UpdateClientDto {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  typeIdentification?: TypeIdentification;
  numberIdentification?: string;
  address?: string;
  isActive?: boolean;
}
