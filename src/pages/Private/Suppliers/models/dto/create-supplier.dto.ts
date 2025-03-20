import {
  CreateIdentification,
  Identification,
  TypeIdentification
} from '../../../../../models/common.model';

export interface CreateSupplierDto {
  firstName: string;
  lastName: string;
  email?: string;
  numPhone?: string;
  typeIdentification?: TypeIdentification;
  numberIdentification?: string;
  deliveryDays?: string[];
}
