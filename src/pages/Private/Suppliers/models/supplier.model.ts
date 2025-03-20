import { IPerson } from '../../../../models';

export interface Supplier {
  id: string;
  person: IPerson;
  deliveryDays: string[];
  isActive: boolean;
}
