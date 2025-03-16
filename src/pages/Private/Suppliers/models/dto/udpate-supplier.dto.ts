import { TypeIdentification } from '../../../../../models/common.model';

export interface UpdateSupplierDto {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  numPhone?: string;
  typeIdentification?: TypeIdentification;
  numberIdentification?: string;
  address?: string;
  isActive?: boolean;
}
